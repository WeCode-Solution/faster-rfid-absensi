@extends('partials.core')

@section('content')
<div class="content-wrapper">
<center>
    <h1>Generate Data</h1>
    <label for="generate">Input Jumlah Data:</label></center>
    <form action="{{ route('generate.data') }}" method="post">

        @csrf
       
        <div class="input-group mx-auto d-flex" style="max-width: 300px;">
            <input type="text" id="generate" name="generate" class="form-control form-control-sm text-center" maxlength="300">
            <div class="input-group-append">
              <button type="submit" class="btn btn-primary btn-sm">Submit</button>
            </div>
      
      </form>
</div>
<center>
<h1>Employee Attendance Data</h1>
</center>


  <div>
      
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
          @php
            $employee = $attendance->employees()->first();
          @endphp
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
