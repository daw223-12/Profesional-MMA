<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || ! in_array($request->user()->role, [
            'super_admin',
            'promoter_admin',
            'gym_admin',
        ])) {
            return response()->json([
                'message' => 'No tienes permisos de administración.',
            ], 403);
        }

        return $next($request);
    }
}
