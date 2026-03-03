<?php

namespace App\Http\Controllers;

use App\Models\Diak;
use App\Models\Ertekeles;
use App\Models\Kerdes;
use App\Models\Valasz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class DiakController extends Controller
{
    public function login(Request $request)
    {
        if (!Cache::get('kerdoiv_aktiv', false)) {
            return response()->json([
                'message' => 'A bejelentkezés jelenleg szünetel, a kérdőív nincs megnyitva.'
            ], 403);
        }

        $request->validate([
            'diak_id' => 'required|integer'
        ]);

        $diak = Diak::query()->find($request->diak_id);

        if (!$diak) {
            return response()->json([
                'message' => 'Nincs ilyen diák'
            ], 404);
        }

        $diak->tokens()->delete();

        $token = $diak->createToken('diak-token', ['role-diak'])->plainTextToken;

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

    public function nemErtekeltTanarok(Request $request)
    {
        $diakId = $request->user()->id;

        // A diák csoportjai
        $csoportIds = DB::table('diak_csoport')
            ->where('diak_id', $diakId)
            ->pluck('csoport_id');

        // Már értékelt tanárok
        $ertekeltTanarIds = DB::table('ertekeles')
            ->where('diak_id', $diakId)
            ->pluck('tanar_id');

        // Tanárok, akiket MÉG NEM értékelt
        $tanarok = DB::table('tanar')
            ->join('tanar_csoport', 'tanar.id', '=', 'tanar_csoport.tanar_id')
            ->whereIn('tanar_csoport.csoport_id', $csoportIds)
            ->whereNotIn('tanar.id', $ertekeltTanarIds)
            ->select('tanar.id', 'tanar.nev')
            ->distinct()
            ->get();

        return response()->json($tanarok);
    }


    public function ertekelesKerdesek(Request $request, $tanarId)
    {
        // Jogosultság ellenőrzése: csak az léphet be, akinek diák tokenje van
        if (!$request->user()->tokenCan('role-diak')) {
            return response()->json(['message' => 'Nincs jogosultságod értékelni'], 403);
        }

        $kerdesek = Kerdes::whereHas('tipus', function ($query) {
            $query->where('megnevezes', 'diák');
        })->select('id', 'leiras')->get();

        return response()->json([
            'tanar_id' => $tanarId,
            'kerdesek' => $kerdesek,
            'valaszlehetosegek' => [
                ['pont' => 4, 'szoveg' => 'Teljesen igaz'],
                ['pont' => 3, 'szoveg' => 'Általában igaz'],
                ['pont' => 2, 'szoveg' => 'Többnyire nem igaz'],
                ['pont' => 1, 'szoveg' => 'Egyáltalán nem igaz'],
                ['pont' => 0, 'szoveg' => 'Nincs információm'],
            ]
        ]);
    }

    public function ertekelesMentese(Request $request, $tanarId)
    {
        $diakId = $request->user()->id;

        // 1. Dupla mentés elleni védelem: ellenőrizzük, létezik-e már értékelés
        $marErtekelte = Ertekeles::where('diak_id', $diakId)
            ->where('tanar_id', $tanarId)
            ->exists();

        if ($marErtekelte) {
            return response()->json(['message' => 'Ezt a tanárt már értékelted!'], 422);
        }

        // 2. Validáció - most már a 'kerdesek' táblára hivatkozva
        $request->validate([
            'valaszok' => 'required|array',
            'valaszok.*.kerdes_id' => 'required|integer|exists:kerdesek,id',
            'valaszok.*.pont' => 'required|integer|min:0|max:4'
        ]);

        try {
            // Tranzakció indítása, hogy ha egy válasz mentése hibás, ne maradjon félbehagyott értékelés
            $eredmeny = DB::transaction(function () use ($request, $diakId, $tanarId) {

                // 3. Fő értékelés rekord létrehozása
                $ertekeles = Ertekeles::create([
                    'diak_id'  => $diakId,
                    'tanar_id' => $tanarId,
                    'datum'    => now(),
                ]);

                $osszesPont = 0;
                $valodiValaszokSzama = 0;

                // 4. Válaszok mentése
                foreach ($request->valaszok as $valasz) {
                    Valasz::create([
                        'ertekeles_id' => $ertekeles->id, // Összekötjük a fő rekorddal
                        'kerdes_id'    => $valasz['kerdes_id'],
                        'tanar_id'     => $tanarId,
                        'ertek'        => $valasz['pont'],
                    ]);

                    // Statisztika számítása (kihagyva a "Nincs információm" / 0 pontot)
                    if ($valasz['pont'] > 0) {
                        $osszesPont += $valasz['pont'];
                        $valodiValaszokSzama++;
                    }
                }

                return [
                    'atlag' => $valodiValaszokSzama > 0 ? round($osszesPont / $valodiValaszokSzama, 2) : 0,
                    'db' => $valodiValaszokSzama
                ];
            });

            return response()->json([
                'message' => 'Sikeres mentés!',
                'atlag' => $eredmeny['atlag'],
                'valaszolt_kerdesek' => $eredmeny['db']
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Hiba történt a mentés során: ' . $e->getMessage()
            ], 500);
        }
    }
}
