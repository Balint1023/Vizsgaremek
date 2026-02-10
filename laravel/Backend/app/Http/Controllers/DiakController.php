<?php

namespace App\Http\Controllers;

use App\Models\Diak;
use App\Models\Ertekeles;
use App\Models\Kerdes;
use App\Models\Valasz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class DiakController extends Controller
{
    public function login(Request $request)
    {
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
        $diakId = $request->user()->id;
        if ($request->user()->id !== (int) $diakId) {
            return response()->json(['message' => 'Nincs jogosultság'], 403);
        }

        // csak DIÁK típusú kérdések
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
    // 1. A bejelentkezett diák azonosítása
    $diakId = $request->user()->id;

    // 2. Validáció
    $request->validate([
        'valaszok' => 'required|array',
        'valaszok.*.kerdes_id' => 'required|integer|exists:kerdesek,id',
        'valaszok.*.pont' => 'required|integer|min:0|max:4'
    ]);

    // Változók inicializálása a tranzakción kívül
    $osszesPont = 0;
    $valaszokSzama = 0;

    try {
        DB::transaction(function () use ($request, $diakId, $tanarId, &$osszesPont, &$valaszokSzama) {
            
            // 3. Értékelés rekord létrehozása (hogy tudjuk, a diák végzett ezzel a tanárral)
            Ertekeles::create([
                'diak_id'  => $diakId,
                'tanar_id' => $tanarId,
                'datum'    => now(), // Ha van ilyen meződ
            ]);

            // 4. Válaszok elmentése
            foreach ($request->valaszok as $valasz) {
                Valasz::create([
                    'kerdes_id' => $valasz['kerdes_id'],
                    'tanar_id'  => $tanarId, // Itt a tanárhoz kötjük a választ
                    'ertek'     => $valasz['pont'],
                    // Ha a Válasz tábla az Értékeléshez is kötődik, akkor annak az ID-ja is kéne ide!
                ]);

                // Pontszám számítás (csak ha nem 0, azaz nem "Nincs információm")
                if ($valasz['pont'] > 0) {
                    $osszesPont += $valasz['pont'];
                    $valaszokSzama++;
                }
            }
        });

        $atlag = $valaszokSzama > 0 ? round($osszesPont / $valaszokSzama, 2) : 0;

        return response()->json([
            'message' => 'Sikeres mentés!',
            'atlag' => $atlag,
            'valaszolt_kerdesek' => $valaszokSzama
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Hiba történt a mentés során: ' . $e->getMessage()
        ], 500);
    }
}
}
