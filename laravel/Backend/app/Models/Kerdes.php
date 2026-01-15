<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kerdes extends Model
{
    protected $table = 'kerdesek';

    protected $fillable = [
        'leiras',
        'tipus_id',
    ];

    public function tipus()
    {
        return $this->belongsTo(KerdesTipus::class, 'tipus_id');
    }

    public function valaszok()
    {
        return $this->hasMany(Valasz::class, 'kerdes_id');
    }
}
