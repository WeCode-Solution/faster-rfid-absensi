import { Context } from 'hono'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Index extends Controller {
  public static Get (ctx: Context): globalThis.Response {
    return ctx.json(Response('Hello world!'))
  }
}
