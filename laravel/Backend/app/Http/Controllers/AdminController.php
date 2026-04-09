<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validációs hiba történt',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Rossz felhasználónév vagy jelszó'], 401);
        }

        $admin->tokens()->delete();

        $token = $admin->createToken('admin-token', ['role-admin'])->plainTextToken;

        return response()->json([
            "message" => "Sikeres bejelentkezés",
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sikeresen kijelentkezve']);
    }

    public function tanarStat($tanarId)
    {
        $tanarNev = DB::table('tanar')->where('id', $tanarId)->value('nev');

        if (!$tanarNev) {
            return response()->json([
                'message' => 'A megadott azonosítóval nem található tanár!'
            ], 404);
        }

        $statisztika = DB::table('valaszok')
            ->join('kerdesek', 'valaszok.kerdes_id', '=', 'kerdesek.id')
            ->where('valaszok.tanar_id', $tanarId)
            ->where('valaszok.ertek', '>', 0)
            ->select(
                'kerdesek.leiras as kerdes',
                DB::raw('ROUND(AVG(valaszok.ertek), 2) as atlag'),
                DB::raw('COUNT(valaszok.id) as ervenyes_valaszok_szama')
            )
            ->groupBy('kerdesek.id', 'kerdesek.leiras')
            ->get();

        return response()->json([
            'tanar' => $tanarNev,
            'statisztika' => $statisztika
        ], 200);
    }

    public function kerdoivStatuszModositas(Request $request)
    {
        $request->validate(['aktiv' => 'required|boolean']);
        Cache::forever('kerdoiv_aktiv', $request->aktiv);

        return response()->json(['success' => true, 'aktiv' => $request->aktiv]);
    }

    public function getKerdoivStatusz()
    {
        $statusz = Cache::get('kerdoiv_aktiv', false);
        return response()->json(['aktiv' => (bool)$statusz]);
    }
}
