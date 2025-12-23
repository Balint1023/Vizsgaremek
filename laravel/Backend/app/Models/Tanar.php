<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tanar extends Model
{
    protected $table = 'tanar';

    protected $fillable = [
        'nev',
    ];

    public function csoportok()
    {
        return $this->belongsToMany(Csoport::class, 'tanar_csoport');
    }

    public function ertekelesek()
    {
        return $this->hasMany(Ertekeles::class);
    }

    public function valaszok()
    {
        return $this->hasMany(Valasz::class);
    }
}
