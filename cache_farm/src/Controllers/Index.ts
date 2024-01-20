import { Context, Hono } from 'hono'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Index extends Controller {
  public static Get (uri: string, app: Hono): Hono {
    return app.get(uri, c => c.json(Response('Hello world!')))
  }
}
