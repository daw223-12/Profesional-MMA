<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fight;
use App\Models\Fighter;
use App\Models\MmaEvent;
use Illuminate\Http\Request;

class FightAdminController extends Controller
{
    public function index(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);
        $this->authorizeEventAccess($request, $event);

        return response()->json(
            $event->fights()
                ->with(['rule', 'fighters'])
                ->orderBy('id')
                ->get()
        );
    }

    public function store(Request $request, int $event)
    {
        $event = MmaEvent::findOrFail($event);
        $this->authorizeEventAccess($request, $event);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'fight_type' => ['required', 'in:single,team,free_for_all'],
            'result_method' => ['nullable', 'string', 'max:255'],
            'result_round' => ['nullable', 'integer', 'min:1'],
            'result_time' => ['nullable', 'string', 'max:20'],
            'rule_id' => ['required', 'exists:rules,id'],
        ]);

        $data['event_id'] = $event->id;

        $fight = Fight::create($data);

        return response()->json(
            $fight->load(['event', 'rule', 'fighters']),
            201
        );
    }

    public function show(Request $request, int $fight)
    {
        $fight = Fight::with(['event.promotion', 'rule', 'fighters'])
            ->findOrFail($fight);

        $this->authorizeEventAccess($request, $fight->event);

        return response()->json($fight);
    }

    public function update(Request $request, int $fight)
    {
        $fight = Fight::with('event')->findOrFail($fight);

        $this->authorizeEventAccess($request, $fight->event);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'fight_type' => ['sometimes', 'required', 'in:single,team,free_for_all'],
            'result_method' => ['nullable', 'string', 'max:255'],
            'result_round' => ['nullable', 'integer', 'min:1'],
            'result_time' => ['nullable', 'string', 'max:20'],
            'rule_id' => ['sometimes', 'required', 'exists:rules,id'],
        ]);

        $fight->update($data);

        return response()->json(
            $fight->fresh()->load(['event', 'rule', 'fighters'])
        );
    }

    public function destroy(Request $request, int $fight)
    {
        $fight = Fight::with('event')->findOrFail($fight);

        $this->authorizeEventAccess($request, $fight->event);

        $fight->delete();

        return response()->json([
            'message' => 'Pelea eliminada correctamente.',
        ]);
    }

    public function attachFighter(Request $request, int $fight)
    {
        $fight = Fight::with('event')->findOrFail($fight);

        $this->authorizeEventAccess($request, $fight->event);

        $data = $request->validate([
            'fighter_id' => ['required', 'exists:fighters,id'],
            'team_name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'weight' => ['nullable', 'numeric', 'min:0'],
            'is_winner' => ['boolean'],
            'result_order' => ['nullable', 'integer', 'min:1'],
        ]);

        $fighterId = $data['fighter_id'];

        unset($data['fighter_id']);

        $fight->fighters()->syncWithoutDetaching([
            $fighterId => $data,
        ]);

        return response()->json(
            $fight->fresh()->load(['rule', 'fighters'])
        );
    }

    public function detachFighter(Request $request, int $fight, int $fighter)
    {
        $fight = Fight::with('event')->findOrFail($fight);

        $this->authorizeEventAccess($request, $fight->event);

        Fighter::findOrFail($fighter);

        $fight->fighters()->detach($fighter);

        return response()->json(
            $fight->fresh()->load(['rule', 'fighters'])
        );
    }

    private function authorizeEventAccess(Request $request, MmaEvent $event): void
    {
        $user = $request->user();

        if ($user->role === 'super_admin') {
            return;
        }

        if (
            $user->role === 'promoter_admin'
            && (int) $event->promotion_id === (int) $user->promotion_id
        ) {
            return;
        }

        abort(response()->json([
            'message' => 'No tienes permisos sobre este evento.',
        ], 403));
    }
}
