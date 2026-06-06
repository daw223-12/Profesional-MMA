<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class MmaEvent extends Model
{

    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'name',
        'date',
        'location',
        'price',
        'status',
        'capacity',
        'image_url',
        'promotion_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function fights()
    {
        return $this->hasMany(Fight::class, 'event_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id');
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites', 'event_id', 'user_id')
            ->withTimestamps();
    }
}
