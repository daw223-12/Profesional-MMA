<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MmaEvent;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = MmaEvent::query()
            ->with('promotion')
            ->where('status', 'published');

        if ($request->get('time') === 'past') {
            $query->where('date', '<', now())
                ->orderByDesc('date');
        } else {
            $query->where('date', '>=', now())
                ->orderBy('date');
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('promotion_id')) {
            $query->where('promotion_id', $request->promotion_id);
        }

        return response()->json($query->paginate(10));
    }

    public function past(Request $request)
    {
        $query = MmaEvent::query()
            ->with('promotion')
            ->where('status', 'published')
            ->where('date', '<', now())
            ->orderByDesc('date');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('promotion_id')) {
            $query->where('promotion_id', $request->promotion_id);
        }

        return response()->json($query->paginate(10));
    }

    public function show(int $event)
    {
        $event = MmaEvent::with([
            'promotion',
            'fights.rule',
            'fights.fighters',
        ])->findOrFail($event);

        if ($event->status !== 'published') {
            abort(404);
        }

        return response()->json($event);
    }

    public function fights(int $event)
    {
        $event = MmaEvent::where('status', 'published')
            ->findOrFail($event);

        return response()->json(
            $event->fights()
                ->with(['rule', 'fighters'])
                ->orderBy('id')
                ->get()
        );
    }
}
