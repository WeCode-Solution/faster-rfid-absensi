import { Hono } from 'hono'
import { TServices } from '../Service'
import { zValidator } from '@hono/zod-validator'
import { Decrypt, Encrypt } from './Functions/Attendance'
import { Sequelize } from 'sequelize'
import { z } from 'zod'
import Response from '../App/Response'
import Controller from '../App/Controller'

interface CardInformation {
  id: number
  nickName: string
  encrypt?: string
}

export default class Attendance extends Controller {
  public static GenerateAttendanceCard (uri: string, app: Hono, service: TServices): Hono {
    return app.post(
      uri,
      zValidator('json', z.object({
        count: z.number()
      })),
      async c => {
        const { count } = c.req.valid('json')
        const data = await service.SQL.Employee
          .findAll({
            order: Sequelize.literal('rand()'),
            limit: count,
            raw: true,
          })

        return c.json(Response('Ok', data.map(v => {
          const newData: CardInformation = {
            id: v.id,
            nickName: v.nickName
          }
          const encrypt = Encrypt(newData)
          return {
            ...newData,
            encrypt,
            len: encrypt.length,
          }
        })))
      }
    )
  }

  public static HitAttendance (uri: string, app: Hono, service: TServices): Hono {
    return app.post(
      uri,
      zValidator('json', z.object({
        data: z.string()
      })),
      // Hono<Context<Env, 'json', { data }>>
      async c => {
        const { data } = c.req.valid('json')
        const decrypt = Decrypt(data) as CardInformation | undefined
        if (!decrypt)
          return c.json(Response('Invalid data!'), 401)

        // TODO: Tambah redis di sini

        return c.json(Response('Ok', decrypt))
      }
    )
  }
}
