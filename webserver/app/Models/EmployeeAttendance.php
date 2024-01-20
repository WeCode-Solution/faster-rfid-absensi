<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeAttendance extends Model
{
    protected $table = 'employee_attendance';

    public function employees()
    {
        return $this->belongsTo(employee::class, 'employee_id');
    }
}