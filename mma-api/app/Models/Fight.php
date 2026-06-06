<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fight extends Model
{
    protected $fillable = [
        'name',
        'fight_type',
        'result_method',
        'result_round',
        'result_time',
        'rule_id',
        'event_id',
    ];

    public function event()
    {
        return $this->belongsTo(MmaEvent::class, 'event_id');
    }

    public function rule()
    {
        return $this->belongsTo(Rule::class);
    }

    public function fighters()
    {
        return $this->belongsToMany(Fighter::class, 'fight_fighters')
            ->withPivot(['team_name', 'position', 'weight', 'is_winner', 'result_order'])
            ->withTimestamps();
    }
}
