<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{

    protected $fillable = ['name','phone','address','notes'];
    protected $casts = ['name'=> 'string','phone'=> 'string','address'=> 'string','notes'=> 'string'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;
}
