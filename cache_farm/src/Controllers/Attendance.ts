import { Context } from 'hono'
import { encrypt, decrypt } from './Functions/Attendance'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Attendance extends Controller {
  public static GenerateAttendanceCard (ctx: Context): globalThis.Response {
    const text = 'Aku ganteng'
    const encryptTxt = encrypt(text)
    const decryptTxt = decrypt(encryptTxt)
    return ctx.json(Response('Ok', {
      text, encryptTxt, decryptTxt
    }))
  }
}
