<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileMovement extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'from_office_id',
        'to_office_id',
        'by_user_id',
        'action',
        'remarks'
    ];

    // RELATIONSHIPS (These were missing!)

    public function fromOffice()
    {
        return $this->belongsTo(Office::class, 'from_office_id');
    }

    public function toOffice()
    {
        return $this->belongsTo(Office::class, 'to_office_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'by_user_id');
    }
}