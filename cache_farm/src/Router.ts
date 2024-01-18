import { Hono } from 'hono'
import IndexController from './Controllers/Index'

export default function (app: Hono): void {
  app.get('/', IndexController.Get)
}
