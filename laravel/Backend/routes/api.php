<?php

use App\Http\Controllers\DiakController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/diak/login', [DiakController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/diak/logout', [DiakController::class, 'logout']);
    Route::get('/diak/{id}/hianyzo-ertekelesek', [DiakController::class, 'nemErtekeltTanarok']);
});
