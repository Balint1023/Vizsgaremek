<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Valasz extends Model
{
    protected $table = 'valaszok';

    protected $fillable = [
        'kerdes_id',
        'tanar_id',
        'ertek',
    ];

    public function kerdes()
    {
        return $this->belongsTo(Kerdes::class);
    }

    public function tanar()
    {
        return $this->belongsTo(Tanar::class);
    }
}
