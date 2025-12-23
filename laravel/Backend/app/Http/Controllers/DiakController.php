<?php

namespace App\Http\Controllers;

use App\Models\Diak;
use App\Models\Tanar;
use Illuminate\Http\Request;


class DiakController extends Controller
{
    public function hianyzoErtekelesek(int $diakId)
    {
        $diak = Diak::with('csoportok')->findOrFail($diakId);

        $tanarok = Tanar::whereHas('csoportok', function ($query) use ($diak) {
            $query->whereIn(
                'csoport.id',
                $diak->csoportok->pluck('id')
            );
        })
            ->whereDoesntHave('ertekelesek', function ($query) use ($diakId) {
                $query->where('diak_id', $diakId);
            })
            ->select('id', 'nev')
            ->distinct()
            ->get();

        return response()->json([
            'diak_id' => $diakId,
            'hianyzo_ertekelesek' => $tanarok
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
