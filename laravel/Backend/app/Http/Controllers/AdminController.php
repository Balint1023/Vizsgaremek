<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

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
            'tanar' => DB::table('tanar')->where('id', $tanarId)->value('nev'),
            'statisztika' => $statisztika
        ]);
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
