@extends('partials.core')
@section('content')
<div class="text-center">
  <h1>Generate Data </h1>
  <form action="{{ route('generate.data') }}" method="post">
    @csrf
    <label for="generate"> Input Jumlah Data:</label><br>
    <input type="text" id="generate" name="generate">
    <br>
    <input type="submit" value="Submit">
  </form>
</div>
<div class="content-wrapper">
    <center><h1>Employee Attendance Data</h1></center>

    <table class="table">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Nick Name</th>
                <th>Recorded At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($attendanceData as $attendance)
                <?php
                $employee = $attendance->employees()->first();
                ?>
                <tr>
                    <td>{{ $employee->id }}</td>
                    <td>{{ $employee->full_name }}</td>
                    <td>{{ $employee->nick_name }}</td>
                    <td>{{ $attendance->recorded_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
