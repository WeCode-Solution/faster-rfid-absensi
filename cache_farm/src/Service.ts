import * as Redis from 'redis'
import 'dotenv/config'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function () {
  // Redis
  const RedisClient = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 6379}`,
    password: process.env.REDIS_PASS ?? 'redisdb'
  })

  RedisClient.on('ready', () => {
    console.log('Redis is ready to serve!')
  })

  return {
    Redis: await RedisClient.connect()
  }
}
