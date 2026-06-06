<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsPremium
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || ! $request->user()->is_premium) {
            return response()->json([
                'message' => 'Esta funcionalidad requiere una cuenta premium.',
            ], 403);
        }

        return $next($request);
    }
}
