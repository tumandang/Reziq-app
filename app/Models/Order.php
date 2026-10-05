<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{

    protected $fillable = [
    'customer_id', 'status', 'subtotal',
    'shipping_cost', 'total_amount', 'notes',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected static function booted(): void
    {
        static::creating(function (Order $order) {
            $order->order_number ??= 'ORD-' . now()->format('ymd') . '-' . strtoupper(Str::random(4));
        });
    }

    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
}
