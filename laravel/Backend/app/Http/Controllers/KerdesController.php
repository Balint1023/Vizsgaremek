<?php

namespace App\Http\Controllers;

use App\Models\Kerdes;
use Illuminate\Http\Request;

class KerdesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Kerdes::with('tipus')->get());
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
        $validated = $request->validate([
            'leiras' => 'required|string|max:255',
            'tipus_id' => 'required|exists:kerdes_tipusok,id'
        ]);

        $kerdes = Kerdes::create($validated);
        return response()->json($kerdes, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kerdes $kerdes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kerdes $kerdes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $kerdes = Kerdes::find($id);

        if (!$kerdes) {
            return response()->json([
                'message' => 'Nincsen ilyen kérdés id!'
            ], 404);
        }

        $validated = $request->validate([
            'leiras' => 'required|string|max:255',
            'tipus_id' => 'required|exists:kerdes_tipusok,id'
        ]);

        $kerdes->update($validated);

        return response()->json([
            'message' => 'Kérdés sikeresen frissítve!',
            'data' => $kerdes
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $toroltDb = Kerdes::destroy($id);

        if ($toroltDb === 0) {
            return response()->json([
                'message' => 'A törölni kívánt kérdés nem található.'
            ], 404);
        }

        return response()->json([
            'message' => 'Kérdés sikeresen törölve!'
        ], 200);
    }
}
