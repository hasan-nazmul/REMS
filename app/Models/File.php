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
        'current_office_id',
        'created_by_user_id'
    ];

    // 1. Who created this file?
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    // 2. Where is this file right now? (The missing piece!)
    public function currentOffice()
    {
        return $this->belongsTo(Office::class, 'current_office_id');
    }

    // 3. What is the history of this file?
    public function movements()
    {
        return $this->hasMany(FileMovement::class)->latest();
    }
}