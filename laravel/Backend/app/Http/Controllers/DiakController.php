<?php

namespace App\Http\Controllers;

use App\Models\Diak;
use App\Models\Ertekeles;
use App\Models\Tanar;
use Illuminate\Http\Request;


class DiakController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'diak_id' => 'required|integer'
        ]);

        $diak = Diak::find($request->diak_id);

        if (!$diak) {
            return response()->json([
                'message' => 'Nincs ilyen diák'
            ], 404);
        }

        $diak->tokens()->delete();

        $token = $diak->createToken('diak-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'diak' => [
                'id' => $diak->id,
                'nev' => $diak->nev
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sikeres kijelentkezés'
        ]);
    }

    public function nemErtekeltTanarok(Request $request, $diakId)
    {
        if ($request->user()->id !== (int) $diakId) {
            return response()->json([
                'message' => 'Nincs jogosultság'
            ], 403);
        }

        $diak = Diak::findOrFail($diakId);

        $tanarok = Tanar::whereHas('csoportok', function ($q) use ($diak) {
            $q->whereIn('csoport.id', $diak->csoportok->pluck('id'));
        });

        $ertekeltTanarIds = Ertekeles::where('diak_id', $diakId)
            ->pluck('tanar_id');

        return $tanarok
            ->whereNotIn('id', $ertekeltTanarIds)
            ->get();
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
    public function show(Diak $diak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diak $diak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diak $diak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diak $diak)
    {
        //
    }
}
