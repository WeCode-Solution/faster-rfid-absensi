import { Hono } from 'hono'
import { TServices } from './Service'
import IndexController from './Controllers/Index'
import AttendanceController from './Controllers/Attendance'

export default function (app: Hono, service: TServices): void {
  IndexController.Get('/', app)
  AttendanceController.GenerateAttendanceCard('/generate', app, service)
  AttendanceController.HitAttendance('/attendance', app, service)
}
