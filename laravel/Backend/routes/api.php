<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DiakController;
use App\Http\Controllers\KerdesController;
use App\Http\Controllers\KerdesTipusController;
use App\Http\Controllers\TanarController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

// Nyilvános végpontok (Bejelentkezés)
Route::post('/diak/login', [DiakController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/kerdoiv-statusz-publikus', function () {
    $ertek = Cache::get('kerdoiv_aktiv', false);
    return response()->json([
        'aktiv' => filter_var($ertek, FILTER_VALIDATE_BOOLEAN)
    ]);
});

// Védett végpontok
Route::middleware('auth:sanctum')->group(function () {

    // --- ADMIN JOGOSULTSÁGÚ VÉGPONTOK ---
    Route::middleware('abilities:role-admin')->group(function () {
        Route::post('/admin/logout', [AdminController::class, 'logout']);

        //kérdőív
        Route::get('admin/kerdoiv-statusz', [AdminController::class, 'getKerdoivStatusz']);
        Route::post('admin/kerdoiv-statusz', [AdminController::class, 'kerdoivStatuszModositas']);

        //statisztika
        Route::get('/admin/stat/tanar/{tanarID}', [AdminController::class, 'tanarStat']);
        Route::get('/tanarok', [TanarController::class, 'index']);

        //kérdések
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
