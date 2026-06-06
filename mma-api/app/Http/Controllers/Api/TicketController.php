<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MmaEvent;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()
                ->tickets()
                ->with('event.promotion')
                ->orderByDesc('created_at')
                ->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'event_id' => ['required', 'exists:events,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:10'],
        ]);

        $event = MmaEvent::findOrFail($data['event_id']);

        if ($event->status !== 'published') {
            return response()->json([
                'message' => 'No se pueden comprar entradas para un evento no publicado.',
            ], 422);
        }

        if ($event->date < now()) {
            return response()->json([
                'message' => 'No se pueden comprar entradas para eventos pasados.',
            ], 422);
        }

        $totalPrice = $event->price * $data['quantity'];

        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'event_id' => $event->id,
            'quantity' => $data['quantity'],
            'total_price' => $totalPrice,
            'status' => 'paid',
        ]);

        return response()->json(
            $ticket->load('event.promotion'),
            201
        );
    }

    public function show(Request $request, int $ticket)
    {
        $ticket = Ticket::with('event.promotion')->findOrFail($ticket);

        $this->authorizeTicketAccess($request, $ticket);

        return response()->json($ticket);
    }

    public function destroy(Request $request, int $ticket)
    {
        $ticket = Ticket::findOrFail($ticket);

        $this->authorizeTicketAccess($request, $ticket);

        $ticket->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'message' => 'Ticket cancelado correctamente.',
            'ticket' => $ticket->fresh()->load('event.promotion'),
        ]);
    }

    private function authorizeTicketAccess(Request $request, Ticket $ticket): void
    {
        if ((int) $ticket->user_id === (int) $request->user()->id) {
            return;
        }

        if ($request->user()->role === 'super_admin') {
            return;
        }

        abort(response()->json([
            'message' => 'No tienes permisos sobre este ticket.',
        ], 403));
    }
}
