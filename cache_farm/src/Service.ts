import * as Redis from 'redis'
import { Sequelize } from 'sequelize'
import { Models as Model } from './Model'
import 'dotenv/config'

export type TServices = Awaited<ReturnType<typeof Services>>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Services = async () => {
  // Redis
  const RedisClient = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 6379}`,
    password: process.env.REDIS_PASS ?? 'redisdb'
  })

  RedisClient.on('ready', () => {
    console.log('Redis is ready to serve!')
  })

  // Sequelize
  const SQLClient = new Sequelize(
    process.env.MARIADB_DB ?? 'absensi',
    process.env.MARIADB_USER ?? '',
    process.env.MARIADB_PASS ?? '',
    {
      dialect: 'mariadb',
      host: process.env.MARIADB_HOST ?? 'localhost'
    }
  )
  await SQLClient.authenticate()
  console.log('MariaDB connected successfully!')

  const Models = Model(SQLClient)

  return {
    Redis: await RedisClient.connect(),
    SQL: Models
  }
}
