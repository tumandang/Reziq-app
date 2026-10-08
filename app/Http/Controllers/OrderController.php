<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\CustomerResources;
use App\Http\Resources\OrderResources;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('orders/index', [
            'collection' => OrderResources::collection(
                $request->user()->orders()->with('customer:id,name')->withCount('items')->latest()->paginate(15)
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('orders/create', [
            'customers' => $request->user()->customers()
                ->orderBy('name')->get(['id', 'name', 'phone', 'address']),
            'products' => $request->user()->products()
                ->withStock()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'price', 'is_active', 'low_stock_threshold']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $userId = $request->user()->id;
        $data = $request->validated();

        $order = DB::transaction(function () use ($request, $data, $userId) {
            $order = $request->user()->orders()->create([
                'customer_id' => $data['customer_id'],
                'order_date' => now(),
                'notes' => $data['notes'] ?? null,
                'subtotal' => 0,
                'shipping_cost' => 0,
                'total_amount' => 0,
            ]);

            $subtotal = 0;
            $needsStock = false;

            foreach ($data['items'] as $item) {
                $product = Product::withStock()
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->findOrFail($item['product_id']);

                if (! $product->is_active) {
                    throw ValidationException::withMessages([
                        'items' => "{$product->name} is inactive.",
                    ]);
                }

                if ($product->stock < $item['quantity']) {
                    $needsStock = true;
                }

                $line = $product->price * $item['quantity'];

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'total_price' => $line,
                ]);

                $subtotal += $line;
            }

            $shipping = $data['shipping_cost'] ?? 0;

            $order->update([
                'subtotal' => $subtotal,
                'shipping_cost' => $shipping,
                'total_amount' => $subtotal + $shipping,
                'status' => $needsStock ? 'awaiting_stock' : 'pending',
            ]);

            $order->payment()->create([
                'amount' => $subtotal + $shipping,
                'payment_method' => $data['payment_method'],
                'status' => 'pending',
            ]);

            $order->shipment()->create([
                'address' => $data['address'],
                'courier_name' => $data['courier_name'] ?? null,
                'tracking_number' => $data['tracking_number'] ?? null,
                'status' => 'pending',
            ]);

            return $order;
        });

        return redirect('/orders');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
