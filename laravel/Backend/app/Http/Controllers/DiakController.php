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

    public function nemErtekeltTanarok(Request $request, $diakId)
    {
        if ($request->user()->id !== (int) $diakId) {
            return response()->json([
                'message' => 'Nincs jogosultság'
            ], 403);
        }

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


    public function ertekelesKerdesek(Request $request, $diakId, $tanarId)
    {
        // biztonság: csak saját magát
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
                ['pont' => 0, 'szoveg' => 'Nincs információm'],
                ['pont' => 1, 'szoveg' => 'Egyáltalán nem igaz'],
                ['pont' => 2, 'szoveg' => 'Többnyire nem igaz'],
                ['pont' => 3, 'szoveg' => 'Általában igaz'],
                ['pont' => 4, 'szoveg' => 'Teljesen igaz'],
            ]
        ]);
    }

    public function ertekelesMentese(Request $request, $diakId, $tanarId)
    {
        if ($request->user()->id !== (int) $diakId) {
            return response()->json(['message' => 'Nincs jogosultság'], 403);
        }

        $request->validate([
            'valaszok' => 'required|array',
            'valaszok.*.kerdes_id' => 'required|integer|exists:kerdesek,id',
            'valaszok.*.pont' => 'required|integer|min:0|max:4'
        ]);

        DB::transaction(function () use ($request, $diakId, $tanarId, &$points, &$questions) {

            // 1️⃣ értékelés létrehozása
            Ertekeles::create([
                'diak_id' => $diakId,
                'tanar_id' => $tanarId,
            ]);

            $points = 0;
            $questions = 0;

            // 2️⃣ válaszok feldolgozása
            foreach ($request->valaszok as $valasz) {

                Valasz::create([
                    'kerdes_id' => $valasz['kerdes_id'],
                    'tanar_id' => $tanarId,
                    'ertek' => $valasz['pont'],
                ]);

                // pontszám logika
                if ($valasz['pont'] > 0) {
                    $points += $valasz['pont'];
                    $questions++;
                }
            }
        });

        // 3️⃣ átlag számítása
        $atlag = $questions > 0 ? round($points / $questions, 2) : null;

        return response()->json([
            'message' => 'Értékelés mentve',
            'points' => $points,
            'questions' => $questions,
            'atlag' => $atlag
        ]);
    }
}
