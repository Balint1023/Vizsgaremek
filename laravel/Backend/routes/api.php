<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CsoportController;
use App\Http\Controllers\DiakController;
use App\Http\Controllers\TanarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/diak/login', [DiakController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/diak/logout', [DiakController::class, 'logout']);
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    Route::get('/tanarok', [TanarController::class, 'index']);
    Route::get('/csoportok', [CsoportController::class, 'index']);
    Route::get('/diak/{id}/hianyzo-ertekelesek', [DiakController::class, 'nemErtekeltTanarok']);
});
