<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Promotion::query()
            ->withCount('events')
            ->orderBy('name');

        if ($request->filled('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->search . '%'
            );
        }

        return response()->json(
            $query->paginate(12)
        );
    }

    public function store(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'website_url' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:255'],
        ]);

        return response()->json(
            Promotion::create($data),
            201
        );
    }

    public function show(int $promotion)
    {
        return response()->json(
            Promotion::with('events')
                ->findOrFail($promotion)
        );
    }

    public function update(Request $request, int $promotion)
    {
        $this->authorizeSuperAdmin($request);

        $promotion = Promotion::findOrFail($promotion);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'website_url' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:255'],
        ]);

        $promotion->update($data);

        return response()->json(
            $promotion->fresh()
        );
    }

    public function destroy(Request $request, int $promotion)
    {
        $this->authorizeSuperAdmin($request);

        $promotion = Promotion::findOrFail($promotion);

        $promotion->delete();

        return response()->json([
            'message' => 'Promotora eliminada correctamente.',
        ]);
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        if ($request->user()->role === 'super_admin') {
            return;
        }

        abort(response()->json([
            'message' => 'Solo un super administrador puede modificar promotoras.',
        ], 403));
    }
}
