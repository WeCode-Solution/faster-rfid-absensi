<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model

    {
        use HasFactory;
    
        protected $fillable = ['full_name', 'nick_name'];
    
        public function attendances()
        {
            return $this->belongsToMany(EmployeeAttendance::class);
        }
    }