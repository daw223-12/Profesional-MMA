<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserAdminController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        $query = User::query()
            ->with(['promotion', 'gym'])
            ->orderBy('name');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('is_premium')) {
            $query->where('is_premium', filter_var($request->is_premium, FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],

            'role' => [
                'required',
                Rule::in(['user', 'super_admin', 'promoter_admin', 'gym_admin']),
            ],

            'is_premium' => ['boolean'],
            'promotion_id' => ['nullable', 'exists:promotions,id'],
            'gym_id' => ['nullable', 'exists:gyms,id'],
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['is_premium'] = $data['is_premium'] ?? false;

        $user = User::create($data);

        return response()->json(
            $user->load(['promotion', 'gym']),
            201
        );
    }

    public function show(Request $request, int $user)
    {
        $this->authorizeSuperAdmin($request);

        return response()->json(
            User::with(['promotion', 'gym', 'tickets', 'favoriteEvents'])
                ->findOrFail($user)
        );
    }

    public function update(Request $request, int $user)
    {
        $this->authorizeSuperAdmin($request);

        $user = User::findOrFail($user);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:6'],

            'role' => [
                'sometimes',
                'required',
                Rule::in(['user', 'super_admin', 'promoter_admin', 'gym_admin']),
            ],

            'is_premium' => ['sometimes', 'boolean'],
            'promotion_id' => ['nullable', 'exists:promotions,id'],
            'gym_id' => ['nullable', 'exists:gyms,id'],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json(
            $user->fresh()->load(['promotion', 'gym'])
        );
    }

    public function destroy(Request $request, int $user)
    {
        $this->authorizeSuperAdmin($request);

        $user = User::findOrFail($user);

        if ((int) $request->user()->id === (int) $user->id) {
            return response()->json([
                'message' => 'No puedes eliminar tu propio usuario desde el panel admin.',
            ], 422);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.',
        ]);
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        if ($request->user()->role === 'super_admin') {
            return;
        }

        abort(response()->json([
            'message' => 'Solo un super administrador puede gestionar usuarios.',
        ], 403));
    }
}
