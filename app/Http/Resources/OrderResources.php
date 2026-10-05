<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
        'id' => $this->id,
        'order_number' => $this->order_number,
        'status' => $this->status,
        'subtotal' => $this->subtotal,
        'shipping_cost' => $this->shipping_cost,
        'total_amount' => $this->total_amount,
        'notes' => $this->notes,
        'created_at' => $this->created_at,
        'items_count' => $this->whenCounted('items'),
        'customer' => $this->whenLoaded('customer', fn () => [
            'id' => $this->customer->id,
            'name' => $this->customer->name,
            'phone' => $this->customer->phone,
        ]),
        'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
            'id' => $item->id,
            'quantity' => $item->quantity,
            'unit_price' => $item->unit_price,
            'total_price' => $item->total_price,
            'product' => [
                'id' => $item->product->id,
                'name' => $item->product->name,
                'stock' => $item->product->stock,
            ],
        ])),
    ];
    }
}
