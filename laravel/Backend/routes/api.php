<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CsoportController;
use App\Http\Controllers\DiakController;
use App\Http\Controllers\TanarController;
use Illuminate\Support\Facades\Route;

// Nyilvános végpontok (Bejelentkezés)
Route::post('/diak/login', [DiakController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

// Védett végpontok
Route::middleware('auth:sanctum')->group(function () {

    // --- ADMIN JOGOSULTSÁGÚ VÉGPONTOK ---
    Route::middleware('abilities:role-admin')->group(function () {
        Route::post('/admin/logout', [AdminController::class, 'logout']);
        Route::get('/tanarok', [TanarController::class, 'index']);
        Route::get('/csoportok', [CsoportController::class, 'index']);
    });

    // --- DIÁK JOGOSULTSÁGÚ VÉGPONTOK ---
    Route::middleware('abilities:role-diak')->group(function () {
        Route::post('/diak/logout', [DiakController::class, 'logout']);

        Route::get('/diak/{id}/hianyzo-ertekelesek', [DiakController::class, 'nemErtekeltTanarok']);
        Route::get('/diak/{diakId}/tanar/{tanarId}/kerdesek', [DiakController::class, 'ertekelesKerdesek']);
    });
});
