<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rule;
use Illuminate\Http\Request;

class RuleAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Rule::query()->orderBy('name');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('weight_class')) {
            $query->where('weight_class', 'like', '%' . $request->weight_class . '%');
        }

        if ($request->filled('style')) {
            $query->where('style', 'like', '%' . $request->style . '%');
        }

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $this->authorizeCreate($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'weight_class' => ['required', 'string', 'max:255'],
            'rounds' => ['required', 'integer', 'min:1', 'max:12'],
            'minutes_per_round' => ['required', 'integer', 'min:1', 'max:30'],
            'style' => ['required', 'string', 'max:255'],
        ]);

        return response()->json(Rule::create($data), 201);
    }

    public function show(int $rule)
    {
        return response()->json(Rule::findOrFail($rule));
    }

    public function update(Request $request, int $rule)
    {
        $this->authorizeSuperAdmin($request);

        $rule = Rule::findOrFail($rule);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'weight_class' => ['sometimes', 'required', 'string', 'max:255'],
            'rounds' => ['sometimes', 'required', 'integer', 'min:1', 'max:12'],
            'minutes_per_round' => ['sometimes', 'required', 'integer', 'min:1', 'max:30'],
            'style' => ['sometimes', 'required', 'string', 'max:255'],
        ]);

        $rule->update($data);

        return response()->json($rule->fresh());
    }

    public function destroy(Request $request, int $rule)
    {
        $this->authorizeSuperAdmin($request);

        $rule = Rule::findOrFail($rule);
        $rule->delete();

        return response()->json([
            'message' => 'Regla eliminada correctamente.',
        ]);
    }

    private function authorizeCreate(Request $request): void
    {
        if (in_array($request->user()->role, ['super_admin', 'promoter_admin'])) {
            return;
        }

        abort(response()->json([
            'message' => 'Nocls
             tienes permisos para crear reglas.',
        ], 403));
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        if ($request->user()->role === 'super_admin') {
            return;
        }

        abort(response()->json([
            'message' => 'Solo un super administrador puede modificar reglas existentes.',
        ], 403));
    }
}
