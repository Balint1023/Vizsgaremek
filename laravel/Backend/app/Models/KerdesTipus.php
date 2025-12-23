<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KerdesTipus extends Model
{
    protected $table = 'kerdes_tipusok';

    protected $fillable = [
        'megnevezes',
        'kerdes_id',
    ];

    public function kerdes()
    {
        return $this->belongsTo(Kerdes::class);
    }
}
