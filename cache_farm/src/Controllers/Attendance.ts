import { Hono } from 'hono'
import { TServices } from '../Service'
import { zValidator } from '@hono/zod-validator'
import { Encrypt, Decrypt } from './Functions/Attendance'
import { z } from 'zod'
import Response from '../App/Response'
import Controller from '../App/Controller'

export default class Attendance extends Controller {
  public static GenerateAttendanceCard (uri: string, app: Hono, service: TServices): Hono {
    return app.post(
      uri,
      zValidator('json', z.object({
        count: z.number()
      })),
      c => {
        const { count } = c.req.valid('json')
        const text = 'Aku ganteng'
        const encryptTxt = Encrypt(text)
        const decryptTxt = Decrypt(encryptTxt)
        return c.json(Response('Ok', {
          text, encryptTxt, decryptTxt, count
        }))
      }
    )
  }
}
