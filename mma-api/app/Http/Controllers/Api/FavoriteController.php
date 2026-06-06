<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MmaEvent;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()
                ->favoriteEvents()
                ->with('promotion')
                ->orderByDesc('date')
                ->get()
        );
    }

    public function store(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);

        $request->user()
            ->favoriteEvents()
            ->syncWithoutDetaching([$event->id]);

        return response()->json([
            'message' => 'Evento añadido a favoritos.',
        ]);
    }

    public function destroy(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);

        $request->user()
            ->favoriteEvents()
            ->detach($event->id);

        return response()->json([
            'message' => 'Evento eliminado de favoritos.',
        ]);
    }
}
