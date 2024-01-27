<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\EmployeeAttendance;

class FakerController extends Controller
{
    public function create_faker(Request $request)
    {
        $numberOfData = $request->input('generate', 50); // Default to 50 if not provided

        for ($i = 0; $i < $numberOfData; $i++) {
            $name = fake()->name();

            $employee = new Employee([
                'full_name' => $name,
                'nick_name' => explode(" ", $name)[0]
            ]);
            $employee->save();
        }
        return redirect('/');
    }

    public function input_attendance(Request $request)
    {
        $data = [
            'employee_id' => $request->input('id'),
            'recorded_at' => $request->input('recorded_at')
        ];

        $employee = new EmployeeAttendance($data);
        $employee->save();

        return response()->json($data);
    }
}
