import { Hono } from 'hono'
import { TServices } from './Service'
import IndexController from './Controllers/Index'
import AttendanceController from './Controllers/Attendance'

export default function (app: Hono, service: TServices): void {
  IndexController.Get('/', app)
  AttendanceController.GenerateAttendanceCard('/generate', app, service)

  //app.post('/attendance', (c) => AttendanceController.ExecuteAttendance(c, service))
}
