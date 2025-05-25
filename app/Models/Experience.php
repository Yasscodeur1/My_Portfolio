<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'company',
        'start_date',
        'end_date',
        'description',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
