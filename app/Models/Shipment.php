<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $fillable = [
    'order_id',
    'courier_name',
    'tracking_number',
    'address',
    'status',
    'shipped_at',
    'delivered_at',
];

protected function casts(): array
{
    return [
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];
}

public function order() { return $this->belongsTo(Order::class); }
    /** @use HasFactory<\Database\Factories\ShipmentFactory> */
    use HasFactory;
}
