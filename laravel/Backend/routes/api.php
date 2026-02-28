<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CsoportController;
use App\Http\Controllers\DiakController;
use App\Http\Controllers\TanarController;
use App\Http\Controllers\KerdesController;
use App\Http\Controllers\KerdesTipusController;
use Illuminate\Support\Facades\Route;

// Nyilvános végpontok (Bejelentkezés)
Route::post('/diak/login', [DiakController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

// Védett végpontok
Route::middleware('auth:sanctum')->group(function () {

    // --- ADMIN JOGOSULTSÁGÚ VÉGPONTOK ---
    Route::middleware('abilities:role-admin')->group(function () {
        Route::post('/admin/logout', [AdminController::class, 'logout']);
        Route::get('/admin/stat/tanar/{tanarID}', [AdminController::class, 'tanarStat']);
        Route::get('/tanarok', [TanarController::class, 'index']);
        Route::get('/csoportok', [CsoportController::class, 'index']);

        Route::get('/kerdesek', [KerdesController::class, 'index']);
        Route::post('/kerdesek', [KerdesController::class, 'store']);
        Route::put('/kerdesek/{id}', [KerdesController::class, 'update']);
        Route::delete('/kerdesek/{id}', [KerdesController::class, 'destroy']);

        Route::get('/kerdes-tipusok', [KerdesTipusController::class, 'index']);
    });

    // --- DIÁK JOGOSULTSÁGÚ VÉGPONTOK ---
    Route::middleware('abilities:role-diak')->group(function () {
        Route::post('/diak/logout', [DiakController::class, 'logout']);

        Route::get('/hianyzo-ertekelesek', [DiakController::class, 'nemErtekeltTanarok']);
        Route::get('/tanar/{tanarId}/kerdesek', [DiakController::class, 'ertekelesKerdesek']);
        Route::post('/tanar/{tanarId}/ertekeles', [DiakController::class, 'ertekelesMentese']);
    });
});
