<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FighterController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\Api\Admin\EventAdminController;
use App\Http\Controllers\Api\Admin\FightAdminController;
use App\Http\Controllers\Api\Admin\FighterAdminController;
use App\Http\Controllers\Api\Admin\GymAdminController;
use App\Http\Controllers\Api\Admin\PromotionAdminController;
use App\Http\Controllers\Api\Admin\RuleAdminController;
use App\Http\Controllers\Api\Admin\UserAdminController;

use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\StripeController;

// ** PUBLIC ROUTES **
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}/fights', [EventController::class, 'fights']);
Route::get('/events/{event}', [EventController::class, 'show'])->whereNumber('event');

Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/promotions/{promotion}', [PromotionController::class, 'show']);

Route::post('/stripe/webhook', [StripeController::class, 'webhook']);

// ** AUTHENTICATED ROUTES **
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/become-premium', [AuthController::class, 'becomePremium']);

    Route::get('/tickets', [TicketController::class, 'index']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);

    Route::get('/profile', [UserController::class, 'show']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::delete('/profile', [UserController::class, 'destroy']);

    Route::post('/stripe/premium-checkout', [StripeController::class, 'premiumCheckout']);
});

// ** PREMIUM CONTENT **
Route::middleware(['auth:sanctum', 'premium'])->group(function () {
    Route::get('/events/past', [EventController::class, 'past']);
    Route::get('/fighters', [FighterController::class, 'index']);
    Route::get('/fighters/{fighter}', [FighterController::class, 'show']);

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{event}', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{event}', [FavoriteController::class, 'destroy']);
});

// ** ADMIN FIGHTERS **
// Fuera de manage.events para que gym_admin pueda crear y gestionar peleadores.
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('/fighters', [FighterAdminController::class, 'index']);
    Route::post('/fighters', [FighterAdminController::class, 'store']);
    Route::get('/fighters/{fighter}', [FighterAdminController::class, 'show']);
    Route::put('/fighters/{fighter}', [FighterAdminController::class, 'update']);
    Route::delete('/fighters/{fighter}', [FighterAdminController::class, 'destroy']);

    Route::post('/fighters/{fighter}/gyms', [FighterAdminController::class, 'attachGym']);
    Route::delete('/fighters/{fighter}/gyms/{gym}', [FighterAdminController::class, 'detachGym']);
});

// ** ADMIN ROUTES **
Route::middleware(['auth:sanctum', 'manage.events'])->prefix('admin')->group(function () {
    Route::get('/events', [EventAdminController::class, 'index']);
    Route::post('/events', [EventAdminController::class, 'store']);
    Route::get('/events/{event}', [EventAdminController::class, 'show']);
    Route::put('/events/{event}', [EventAdminController::class, 'update']);
    Route::delete('/events/{event}', [EventAdminController::class, 'destroy']);

    Route::get('/events/{event}/fights', [FightAdminController::class, 'index']);
    Route::post('/events/{event}/fights', [FightAdminController::class, 'store']);

    Route::get('/fights/{fight}', [FightAdminController::class, 'show']);
    Route::put('/fights/{fight}', [FightAdminController::class, 'update']);
    Route::delete('/fights/{fight}', [FightAdminController::class, 'destroy']);

    Route::post('/fights/{fight}/fighters', [FightAdminController::class, 'attachFighter']);
    Route::delete('/fights/{fight}/fighters/{fighter}', [FightAdminController::class, 'detachFighter']);

    Route::get('/gyms', [GymAdminController::class, 'index']);
    Route::post('/gyms', [GymAdminController::class, 'store']);
    Route::get('/gyms/{gym}', [GymAdminController::class, 'show']);
    Route::put('/gyms/{gym}', [GymAdminController::class, 'update']);
    Route::delete('/gyms/{gym}', [GymAdminController::class, 'destroy']);

    Route::get('/promotions', [PromotionAdminController::class, 'index']);
    Route::post('/promotions', [PromotionAdminController::class, 'store']);
    Route::get('/promotions/{promotion}', [PromotionAdminController::class, 'show']);
    Route::put('/promotions/{promotion}', [PromotionAdminController::class, 'update']);
    Route::delete('/promotions/{promotion}', [PromotionAdminController::class, 'destroy']);

    Route::get('/rules', [RuleAdminController::class, 'index']);
    Route::post('/rules', [RuleAdminController::class, 'store']);
    Route::get('/rules/{rule}', [RuleAdminController::class, 'show']);
    Route::put('/rules/{rule}', [RuleAdminController::class, 'update']);
    Route::delete('/rules/{rule}', [RuleAdminController::class, 'destroy']);

    Route::get('/users', [UserAdminController::class, 'index']);
    Route::post('/users', [UserAdminController::class, 'store']);
    Route::get('/users/{user}', [UserAdminController::class, 'show']);
    Route::put('/users/{user}', [UserAdminController::class, 'update']);
    Route::delete('/users/{user}', [UserAdminController::class, 'destroy']);
});
