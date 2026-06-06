<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'website_url',
        'image_url',
    ];

    public function events()
    {
        return $this->hasMany(MmaEvent::class, 'promotion_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'promotion_id');
    }
}
