import { Context } from 'hono'
import * as AES from './Functions/Attendance'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Attendance extends Controller {
  public static GenerateAttendanceCard (ctx: Context): globalThis.Response {
    const text = 'Aku ganteng'
    const encrypt = AES.encrypt(text)
    const decrypt = AES.decrypt(encrypt)
    return ctx.json(Response('Ok', {
      text, encrypt, decrypt
    }))
  }
}
