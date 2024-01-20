<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FakerController;
use App\Http\Controllers\AbsensiView;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', [AbsensiView::class, 'absen']);

Route::post('/generate-data', [FakerController::class, 'create_faker'])->name('generate.data');
