<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Diak extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'diak';

    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = false;

    protected $fillable = ['id', 'nev'];

    public function csoportok()
    {
        return $this->belongsToMany(Csoport::class, 'diak_csoport');
    }

    public function ertekelesek()
    {
        return $this->hasMany(Ertekeles::class);
    }
}
