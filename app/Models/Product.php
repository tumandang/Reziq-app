<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // yang boleh isi
    protected $fillable = [
        'name',
        'price',
        'low_stock_threshold',
        'is_active',
    ];
    //ubah type data automatically
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }

    public function scopeWithStock($query)
    {
        return $query->withSum(['inventory as added' => fn($q) => $q->where('adjustment_type', 'Addation')], 'quantity')
            ->withSum(['inventory as subtracted' => fn($q) => $q->where('adjustment_type', 'Subtraction')], 'quantity');
    }
    public function getStockAttribute(): int
    {
        return (int) ($this->added ?? 0) - (int) ($this->subtracted ?? 0);
    }
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
}
