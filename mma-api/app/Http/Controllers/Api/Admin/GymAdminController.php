<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gym;
use Illuminate\Http\Request;

class GymAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Gym::query()
            ->with('fighters')
            ->orderBy('name');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('specialty')) {
            $query->where('specialty', 'like', '%' . $request->specialty . '%');
        }

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'specialty' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:255'],
        ]);

        $gym = Gym::create($data);

        return response()->json($gym, 201);
    }

    public function show(int $gym)
    {
        return response()->json(
            Gym::with('fighters')->findOrFail($gym)
        );
    }

    public function update(Request $request, int $gym)
    {
        $this->authorizeSuperAdmin($request);

        $gym = Gym::findOrFail($gym);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'specialty' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:255'],
        ]);

        $gym->update($data);

        return response()->json($gym->fresh());
    }

    public function destroy(Request $request, int $gym)
    {
        $this->authorizeSuperAdmin($request);

        $gym = Gym::findOrFail($gym);
        $gym->delete();

        return response()->json([
            'message' => 'Gimnasio eliminado correctamente.',
        ]);
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        if ($request->user()->role === 'super_admin') {
            return;
        }

        abort(response()->json([
            'message' => 'Solo un super administrador puede modificar gimnasios.',
        ], 403));
    }
}
