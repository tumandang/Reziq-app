<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{

protected $fillable = [
    'status',
    'order_date',
    'subtotal',
    'shipping_cost',
    'total_amount',
    'notes',
    'customer_id',
    'user_id',
];
protected function casts(): array
{
    return [
        'order_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];
}
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

    public function payment()  { 
        return $this->hasOne(Payment::class); 
        
    }

    public function shipment() { 
        return $this->hasOne(Shipment::class);
    }

    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
}
