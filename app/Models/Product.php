<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // yang boleh isi
    protected $fillable = [
        'name',
        'description',
        'cost',
        'price',
        'stock',
        'low_stock_threshold',
        'is_active',
    ];
    //ubah type data automatically
    protected $casts = [
        'is_active' => 'boolean',
        'cost' => 'decimal:2',
        'price' => 'decimal:2',
        'stock' => 'integer',
        'low_stock_threshold' => 'integer',
    ];

    public function getIsLowStockAttribute(): bool
    {
        return $this->stock !== null && $this->low_stock_threshold !== null && $this->stock <= $this->low_stock_threshold;
    }
    //massukkan addtional attributes tanpa sentuh db
    protected $appends = [
        'is_low_stock',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
}
