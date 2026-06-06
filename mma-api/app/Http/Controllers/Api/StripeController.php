<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\StripeClient;
use Stripe\Webhook;

class StripeController extends Controller
{
    public function premiumCheckout(Request $request)
    {
        $user = $request->user();


        if ($user->is_premium) {
            return response()->json([
                'message' => 'El usuario ya es premium.',
            ], 422);
        }

        $stripe = new StripeClient(config('services.stripe.secret'));

        $account = $stripe->accounts->retrieve();

        Log::info('Cuenta Stripe usada por Laravel', [
            'stripe_account_id' => $account->id,
            'stripe_email' => $account->email ?? null,
        ]);

        $session = $stripe->checkout->sessions->create([
            'mode' => 'payment',
            'customer_email' => $user->email,

            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount' => 999,
                    'product_data' => [
                        'name' => 'Acceso Premium Professional MMA',
                    ],
                ],
                'quantity' => 1,
            ]],

            'success_url' => env('FRONTEND_URL') . '/payment/success',
            'cancel_url' => env('FRONTEND_URL') . '/payment/cancel',

            'metadata' => [
                'user_id' => $user->id,
                'type' => 'premium_access',
            ],
        ]);

        return response()->json([
            'checkout_url' => $session->url,
        ]);
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent(
                $payload,
                $signature,
                $secret
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json([
                'message' => 'Payload inválido.',
            ], 400);
        } catch (SignatureVerificationException $e) {
            return response()->json([
                'message' => 'Firma inválida.',
            ], 400);
        }
        Log::info('Stripe webhook recibido', [
            'type' => $event->type,
        ]);

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            if (
                $session->mode === 'payment'
                && $session->payment_status === 'paid'
                && ($session->metadata->type ?? null) === 'premium_access'
            ) {
                $userId = $session->metadata->user_id ?? null;

                if ($userId) {
                    $user = User::find($userId);

                    if ($user) {
                        $user->is_premium = true;
                        $user->save();

                        Log::info('Usuario actualizado a premium', [
                            'user_id' => $user->id,
                            'is_premium' => $user->is_premium,
                        ]);
                    } else {
                        Log::warning('Usuario no encontrado para premium', [
                            'user_id' => $userId,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'received' => true,
        ]);
    }
}
