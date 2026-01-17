<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DiakAuth
{
    public function handle(Request $request, Closure $next)
    {
        if (!session()->has('diak_id')) {
            return response()->json([
                'message' => 'Nincs bejelentkezve'
            ], 401);
        }

        return $next($request);
    }
}
