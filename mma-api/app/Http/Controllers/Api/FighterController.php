<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fighter;
use Illuminate\Http\Request;

class FighterController extends Controller
{
    public function index(Request $request)
    {
        $query = Fighter::query()
            ->with('gyms')
            ->orderBy('name');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('nickname', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('gym_id')) {
            $query->whereHas('gyms', function ($q) use ($request) {
                $q->where('gyms.id', $request->gym_id);
            });
        }

        return response()->json($query->paginate(12));
    }

    public function show(Fighter $fighter)
    {
        $fighter->load([
            'gyms',
            'fights.event',
            'fights.rule',
        ]);

        return response()->json($fighter);
    }
}
