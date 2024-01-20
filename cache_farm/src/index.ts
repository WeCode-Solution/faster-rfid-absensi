import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Services } from './Service'
import Error from './Error'
import Router from './Router'

const application = async (): Promise<void> => {
  const app = new Hono()
  const service = await Services()
  Router(app, service)
  Error(app)

  const port = 3000
  console.log(`Server is running on port ${port}`)
  serve({ fetch: app.fetch, port })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
application()
