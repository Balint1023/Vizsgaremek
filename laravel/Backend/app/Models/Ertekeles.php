<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ertekeles extends Model
{
    protected $table = 'ertekeles';

    protected $fillable = [
        'diak_id',
        'tanar_id',
    ];

    public function diak()
    {
        return $this->belongsTo(Diak::class);
    }

    public function tanar()
    {
        return $this->belongsTo(Tanar::class);
    }
}
