<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KerdesTipus extends Model
{
    protected $table = 'kerdes_tipusok';

    protected $fillable = [
        'megnevezes',
    ];

    public function kerdesek()
    {
        return $this->hasMany(Kerdes::class, 'tipus_id');
    }
}

