import { Hono } from 'hono'
import { TServices } from '../Service'
import { zValidator } from '@hono/zod-validator'
import { Encrypt, Decrypt } from './Functions/Attendance'
import { z } from 'zod'
import Response from '../App/Response'
import Controller from '../App/Controller'
import {Sequelize} from 'sequelize'

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
          const newData = {
            id: v.id,
            nickName: v.nickName
          }
          const encrypt = Encrypt(JSON.stringify(newData))
          return {
            ...newData,
            encrypt,
            len: encrypt.length
          }
        })))
      }
    )
  }
}
