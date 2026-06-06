<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserCanManageEvents
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || ! in_array($request->user()->role, [
            'super_admin',
            'promoter_admin',
        ])) {
            return response()->json([
                'message' => 'No tienes permisos para gestionar eventos.',
            ], 403);
        }

        return $next($request);
    }
}
