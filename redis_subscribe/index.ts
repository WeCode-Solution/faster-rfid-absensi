import * as Redis from 'redis'
import * as Process from 'process';
import { Sequelize } from 'sequelize'
import { Models as Model } from './Model'
import 'dotenv/config'

;(async () => {
  // Redis Subscriber
  const RedisSubClient = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 6379}`,
    password: process.env.REDIS_PASS ?? 'redisdb'
  })
  RedisSubClient.on('ready', () => {
    console.log('Redis Subscriber is ready to serve!')
  })
  await RedisSubClient.connect()
  RedisSubClient.configSet('notify-keyspace-events', 'KEA')

  // Redis Client
  const RedisClient = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 6379}`,
    password: process.env.REDIS_PASS ?? 'redisdb'
  })
  RedisClient.on('ready', () => {
    console.log('Redis is ready to serve!')
  })
  await RedisClient.connect()

  // Sequelize
  const SQLClient = new Sequelize(
    process.env.MARIADB_DB ?? 'absensi',
    process.env.MARIADB_USER ?? '',
    process.env.MARIADB_PASS ?? '',
    {
      dialect: 'mariadb',
      host: process.env.MARIADB_HOST ?? 'localhost',
      define: {
        freezeTableName: true,
        underscored: true
      }
    }
  )
  await SQLClient.authenticate()
  const Models = Model(SQLClient)
  console.log('MariaDB connected successfully!')

  console.log('Waiting for data')
  RedisSubClient.pSubscribe('__key*user:*', async (msg: string, channel: string) => {
    if (msg !== 'set') return
    const key = channel.split(':').slice(1).join(':')

    const val = await RedisClient.get(key)
    if (!val) return

    const del = await RedisClient.del(key)
    if (del === 0) return
    console.log(`${key} : ${val}`)

    await Models.EmployeeAttendance.create({
      employeeId: parseInt(key.split(':')[1]),
      recordedAt: new Date(val),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  Process.stdin.resume()
})()
