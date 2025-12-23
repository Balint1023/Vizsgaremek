<?php

use App\Http\Controllers\DiakController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get(
    '/diak/{diakId}/hianyzo-ertekelesek',
    [DiakController::class, 'hianyzoErtekelesek']
);
