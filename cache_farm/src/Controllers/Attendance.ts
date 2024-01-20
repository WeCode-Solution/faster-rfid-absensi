import { Context, MiddlewareHandler } from 'hono'
import { TServices } from '../Service'
import { Encrypt, Decrypt } from './Functions/Attendance'
import { z } from 'zod'
import Validator from '../App/Validator'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Attendance extends Controller {
  public static GenerateAttendanceCardValidate (): MiddlewareHandler {
    return Validator('json', z.object({
      count: z.number()
    }))
  }

  public static GenerateAttendanceCard (ctx: Context): globalThis.Response {
    const text = 'Aku ganteng'
    const encryptTxt = Encrypt(text)
    const decryptTxt = Decrypt(encryptTxt)
    return ctx.json(Response('Ok', {
      text, encryptTxt, decryptTxt
    }))
  }

  public static ExecuteAttendance (ctx: Context, service: TServices): globalThis.Response {
    return ctx.json(Response('Ok'))
  }
}
