import { Hono } from 'hono'
import Service from './Service'
import IndexController from './Controllers/Index'
import AttendanceController from './Controllers/Attendance'

export default function (app: Hono, service: Awaited<ReturnType<typeof Service>>): void {
  app.get('/', IndexController.Get)
  app.post('/generate', AttendanceController.GenerateAttendanceCard)
}
