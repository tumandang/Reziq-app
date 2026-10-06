<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    /** @use HasFactory<\Database\Factories\InventoryFactory> */
    protected $fillable = ['product_id', 'adjustment_type','reason','quantity'];
    public function product(){
        return $this->belongsTo(Product::class);
    }
    use HasFactory;
}
