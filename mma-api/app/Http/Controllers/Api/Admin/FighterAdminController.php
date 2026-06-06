<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fighter;
use App\Models\Gym;
use Illuminate\Http\Request;

class FighterAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Fighter::query()
            ->with('gyms')
            ->orderBy('name');

        if ($request->user()->role === 'gym_admin') {
            $query->whereHas('gyms', function ($q) use ($request) {
                $q->where('gyms.id', $request->user()->gym_id);
            });
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('nickname', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nickname' => ['nullable', 'string', 'max:255'],
            'wins' => ['nullable', 'integer', 'min:0'],
            'losses' => ['nullable', 'integer', 'min:0'],
            'draws' => ['nullable', 'integer', 'min:0'],
            'height' => ['nullable', 'numeric', 'min:0'],
            'reach' => ['nullable', 'numeric', 'min:0'],
            'photo_url' => ['nullable', 'string', 'max:255'],
        ]);

        $fighter = Fighter::create($data);

        if ($request->user()->role === 'gym_admin') {
            $fighter->gyms()->attach($request->user()->gym_id, [
                'start_date' => now()->toDateString(),
            ]);
        }

        return response()->json($fighter->load('gyms'), 201);
    }

    public function show(Request $request, int $fighter)
    {
        $fighter = Fighter::with(['gyms', 'fights.event', 'fights.rule'])
            ->findOrFail($fighter);

        $this->authorizeFighterAccess($request, $fighter);

        return response()->json($fighter);
    }

    public function update(Request $request, int $fighter)
    {
        $fighter = Fighter::with('gyms')->findOrFail($fighter);

        $this->authorizeFighterAccess($request, $fighter);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'nickname' => ['nullable', 'string', 'max:255'],
            'wins' => ['nullable', 'integer', 'min:0'],
            'losses' => ['nullable', 'integer', 'min:0'],
            'draws' => ['nullable', 'integer', 'min:0'],
            'height' => ['nullable', 'numeric', 'min:0'],
            'reach' => ['nullable', 'numeric', 'min:0'],
            'photo_url' => ['nullable', 'string', 'max:255'],
        ]);

        $fighter->update($data);

        return response()->json($fighter->fresh()->load('gyms'));
    }

    public function destroy(Request $request, int $fighter)
    {
        $fighter = Fighter::with('gyms')->findOrFail($fighter);

        $this->authorizeFighterAccess($request, $fighter);

        $fighter->delete();

        return response()->json([
            'message' => 'Peleador eliminado correctamente.',
        ]);
    }

    public function attachGym(Request $request, int $fighter)
    {
        $fighter = Fighter::with('gyms')->findOrFail($fighter);

        $this->authorizeFighterAccess($request, $fighter);

        if ($request->user()->role === 'gym_admin') {
            return response()->json([
                'message' => 'Un administrador de gimnasio no puede asignar gimnasios manualmente.',
            ], 403);
        }

        $data = $request->validate([
            'gym_id' => ['required', 'exists:gyms,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'image_url' => ['nullable', 'string', 'max:255'],
        ]);

        $gymId = $data['gym_id'];
        unset($data['gym_id']);

        $fighter->gyms()->syncWithoutDetaching([
            $gymId => $data,
        ]);

        return response()->json($fighter->fresh()->load('gyms'));
    }

    public function detachGym(Request $request, int $fighter, int $gym)
    {
        $fighter = Fighter::with('gyms')->findOrFail($fighter);

        $this->authorizeFighterAccess($request, $fighter);

        if ($request->user()->role === 'gym_admin') {
            return response()->json([
                'message' => 'Un administrador de gimnasio no puede quitar gimnasios manualmente.',
            ], 403);
        }

        Gym::findOrFail($gym);

        $fighter->gyms()->detach($gym);

        return response()->json($fighter->fresh()->load('gyms'));
    }

    private function authorizeFighterAccess(Request $request, Fighter $fighter): void
    {
        $user = $request->user();

        if (in_array($user->role, ['super_admin', 'promoter_admin'])) {
            return;
        }

        if ($user->role === 'gym_admin') {
            $belongsToGym = $fighter->gyms()
                ->where('gyms.id', $user->gym_id)
                ->exists();

            if ($belongsToGym) {
                return;
            }
        }

        abort(response()->json([
            'message' => 'No tienes permisos sobre este peleador.',
        ], 403));
    }
}
