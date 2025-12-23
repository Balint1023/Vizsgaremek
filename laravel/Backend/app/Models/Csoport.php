<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Csoport extends Model
{
    protected $table = 'csoport';

    protected $fillable = [
        'nev',
    ];

    public function diakok()
    {
        return $this->belongsToMany(Diak::class, 'diak_csoport');
    }

    public function tanarok()
    {
        return $this->belongsToMany(Tanar::class, 'tanar_csoport');
    }
}
