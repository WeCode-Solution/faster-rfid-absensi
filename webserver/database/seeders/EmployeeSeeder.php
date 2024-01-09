<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use Database\Factories\EmployeeFactory;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Use the EmployeeFactory to create 5000 entries
        Employee::factory(5000)->create();
    }
}