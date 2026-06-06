<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Gym extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'specialty',
        'image_url',
    ];

    public function fighters()
    {
        return $this->belongsToMany(Fighter::class, 'gym_fighters')
            ->withPivot(['start_date', 'end_date', 'image_url'])
            ->withTimestamps();
    }

    public function users()
    {
        return $this->hasMany(User::class, 'gym_id');
    }
}
