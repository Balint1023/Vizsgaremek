<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Diak extends Model
{
    use HasApiTokens;

    protected $table = 'diak';

    protected $fillable = ['id', 'nev'];

    public $incrementing = false;

    public function csoportok()
    {
        return $this->belongsToMany(Csoport::class, 'diak_csoport');
    }

    public function ertekelesek()
    {
        return $this->hasMany(Ertekeles::class);
    }
}
