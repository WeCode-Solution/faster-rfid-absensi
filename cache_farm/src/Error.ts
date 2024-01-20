import { Hono } from 'hono'
import Response from './App/Response'

export default function (app: Hono): void {
  app.notFound(c => c.json(Response('Not found!'), 404))

  app.onError((err, c) => {
    console.error(err)
    return c.json(Response('Something happened on server!', {
      message: err.message
    }), 500)
  })
}
