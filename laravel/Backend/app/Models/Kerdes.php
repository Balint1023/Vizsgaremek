<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kerdes extends Model
{
    protected $table = 'kerdesek';

    protected $fillable = [
        'leiras',
    ];

    public function tipusok()
    {
        return $this->hasMany(KerdesTipus::class, 'kerdes_id');
    }

    public function valaszok()
    {
        return $this->hasMany(Valasz::class, 'kerdes_id');
    }
}
