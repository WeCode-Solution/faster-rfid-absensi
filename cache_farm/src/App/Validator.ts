import { MiddlewareHandler, ValidationTargets } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { ZodObject } from 'zod'
import Response from './Response'

export default function (type: keyof ValidationTargets, data: ZodObject<{}>): MiddlewareHandler {
  return zValidator(type, data, (value, c) => {
    if (!value.success)
      return c.json(Response('Invalid input!', value.error.flatten()), 400)
  })
}
