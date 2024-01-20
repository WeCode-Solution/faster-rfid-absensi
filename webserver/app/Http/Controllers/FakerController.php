<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class FakerController extends Controller
{
    public function create_faker(Request $request)
    {
        for ($i = 0; $i < 50; $i++) {
            $name = fake()->name();

            $employee = new Employee([
                'full_name' => $name,
                'nick_name' => explode(" ", $name)[0]
            ]);
            $employee->save();
        }
        return response()->json(['data' => 'done!']);
    }
}
