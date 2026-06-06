<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Fighter extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'nickname',
        'wins',
        'losses',
        'draws',
        'height',
        'reach',
        'photo_url',
    ];

    protected $casts = [
        'height' => 'decimal:2',
        'reach' => 'decimal:2',
    ];

    public function gyms()
    {
        return $this->belongsToMany(Gym::class, 'gym_fighters')
            ->withPivot(['start_date', 'end_date', 'image_url'])
            ->withTimestamps();
    }

    public function fights()
    {
        return $this->belongsToMany(Fight::class, 'fight_fighters')
            ->withPivot(['team_name', 'position', 'weight', 'is_winner', 'result_order'])
            ->withTimestamps();
    }
}
