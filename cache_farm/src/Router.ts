import { Hono } from 'hono'
import Service from './Service'
import IndexController from './Controllers/Index'

export default function (app: Hono, service: Awaited<ReturnType<typeof Service>>): void {
  app.get('/', IndexController.Get)
}
