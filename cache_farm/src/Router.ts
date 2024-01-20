import { Hono } from 'hono'
import { Services, TServices } from './Service'
import IndexController from './Controllers/Index'
import AttendanceController from './Controllers/Attendance'

export default function (app: Hono, service: TServices): void {
  app.get('/', IndexController.Get)
  app.post('/generate', AttendanceController.GenerateAttendanceCard)
  app.post('/attendance', (c) => AttendanceController.ExecuteAttendance(c, service))
}
