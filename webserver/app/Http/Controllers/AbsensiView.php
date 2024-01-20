<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeAttendance;
use App\Models\Employee;

class AbsensiView extends Controller
{
    public function absen()
    {
        // Fetch data from the employee-attendance table with related employee information
        $attendanceData = EmployeeAttendance::with('employee')->get();

        // You can now use $attendanceData in your view or return it as JSON, for example:
            return view('Dashboard', ['attendanceData' => $attendanceData]);
        }
    }

