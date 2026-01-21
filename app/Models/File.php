<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'description',
        'priority',
        'status',
        'origin_office_id',
        'current_office_id',
        'creator_user_id'
    ];

    // Relationships
    public function currentOffice()
    {
        return $this->belongsTo(Office::class, 'current_office_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }
}