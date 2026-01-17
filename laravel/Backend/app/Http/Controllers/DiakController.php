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

        // Session alapú beléptetés
        session([
            'diak_id' => $diak->id
        ]);

        return response()->json([
            'message' => 'Sikeres belépés',
            'diak' => [
                'id' => $diak->id,
                'nev' => $diak->nev
            ]
        ]);
    }

    // KIJELENTKEZÉS
    public function logout()
    {
        session()->forget('diak_id');

        return response()->json([
            'message' => 'Sikeres kijelentkezés'
        ]);
    }

    public function nemErtekeltTanarok(Request $request, $diakId)
    {
        if (session('diak_id') != $diakId) {
            return response()->json([
                'message' => 'Hozzáférés megtagadva'
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
