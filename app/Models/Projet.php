<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'github_link',
        'demo_link',
        'image',
    ];

    protected $casts = [
        'technologies' => 'array',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
