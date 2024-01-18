import { Context } from 'hono'
import Controller from '../App/Controller'

export default class Index extends Controller {
  public static Get (ctx: Context): globalThis.Response {
    return ctx.text('Hello world!')
  }
}
