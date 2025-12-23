<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diak extends Model
{
    protected $table = 'diak';

    protected $fillable = [
        'nev',
    ];

    public function csoportok()
    {
        return $this->belongsToMany(Csoport::class, 'diak_csoport');
    }

    public function ertekelesek()
    {
        return $this->hasMany(Ertekeles::class);
    }
}
