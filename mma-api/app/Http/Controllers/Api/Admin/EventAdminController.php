<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\MmaEvent;
use Illuminate\Http\Request;

class EventAdminController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = MmaEvent::query()
            ->with('promotion')
            ->orderByDesc('date');

        if ($user->role === 'promoter_admin') {
            $query->where('promotion_id', $user->promotion_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'location' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:draft,published,cancelled'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'promotion_id' => ['required', 'exists:promotions,id'],
        ]);

        if ($user->role === 'promoter_admin') {
            if ((int) $data['promotion_id'] !== (int) $user->promotion_id) {
                return response()->json([
                    'message' => 'No puedes crear eventos para otra promotora.',
                ], 403);
            }
        }

        $event = MmaEvent::create($data);

        return response()->json($event->load('promotion'), 201);
    }

    public function show(Request $request, int $event)
    {
        $event = MmaEvent::with([
            'promotion',
            'fights.rule',
            'fights.fighters',
        ])->findOrFail($event);

        $this->authorizeEventAccess($request, $event);

        return response()->json($event);
    }

    public function update(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);

        $this->authorizeEventAccess($request, $event);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'date' => ['sometimes', 'required', 'date'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'status' => ['sometimes', 'required', 'in:draft,published,cancelled'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'promotion_id' => ['sometimes', 'required', 'exists:promotions,id'],
        ]);

        $user = $request->user();

        if ($user->role === 'promoter_admin') {
            unset($data['promotion_id']);
        }

        $event->update($data);

        return response()->json($event->fresh()->load('promotion'));
    }

    public function destroy(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);

        $this->authorizeEventAccess($request, $event);

        $event->delete();

        return response()->json([
            'message' => 'Evento eliminado correctamente.',
        ]);
    }

    private function authorizeEventAccess(Request $request, MmaEvent $event): void
    {
        $user = $request->user();

        if ($user->role === 'super_admin') {
            return;
        }

        if ($user->role === 'promoter_admin'
            && (int) $event->promotion_id === (int) $user->promotion_id) {
            return;
        }

        abort(response()->json([
            'message' => 'No tienes permisos sobre este evento.',
        ], 403));
    }
}
