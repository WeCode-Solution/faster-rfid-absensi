import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import Router from './Router'
import Service from './Service'
import 'dotenv/config'

const application = async (): Promise<void> => {
  const app = new Hono()
  const service = await Service()
  Router(app, service)

  const port = 3000
  console.log(`Server is running on port ${port}`)
  serve({ fetch: app.fetch, port })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
application()
