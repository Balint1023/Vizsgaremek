<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DiakController;
use Illuminate\Support\Facades\Route;

Route::post('/diak/login', [DiakController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/diak/logout', [DiakController::class, 'logout']);
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    Route::get('/diak/{id}/hianyzo-ertekelesek', [DiakController::class, 'nemErtekeltTanarok']);
});

Route::middleware('auth:sanctum')->get(
    '/diak/{diakId}/tanar/{tanarId}/kerdesek',
    [DiakController::class, 'ertekelesKerdesek']
);
