<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    protected $fillable = [
        'name',
        'weight_class',
        'rounds',
        'minutes_per_round',
        'style',
    ];

    public function fights()
    {
        return $this->hasMany(Fight::class);
    }
}
