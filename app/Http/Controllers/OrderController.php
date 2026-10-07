<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\CustomerResources;
use App\Http\Resources\OrderResources;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
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
                ->orderBy('name')->get(['id', 'name', 'phone']),
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

        $data = $request->validate([
            'customer_id' => ['required', Rule::exists('customers', 'id')->where('user_id', $userId)],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', Rule::exists('products', 'id')->where('user_id', $userId)],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);


        $order = DB::transaction(function () use ($request, $data) {
            $order = $request->user()->orders()->create([
                'customer_id' => $data['customer_id'],
                'notes' => $data['notes'] ?? null,
                'subtotal' => 0,
                'shipping_cost' => 0,
                'total_amount' => 0,
            ]);

            $subtotal = 0;
            $short = false;

            foreach ($data['items'] as $row) {
                $product = $request->user()->products()->findOrFail($row['product_id']);
                $lineTotal = $product->price * $row['quantity'];

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $row['quantity'],
                    'unit_price' => $product->price,
                    'total_price' => $lineTotal,
                ]);

                $subtotal += $lineTotal;

                if ($product->stock !== null && $row['quantity'] > $product->stock_quantity) {
                    $short = true;
                }
            }

            $order->update([
                'subtotal' => $subtotal,
                'total_amount' => $subtotal + $order->shipping_cost,
                'status' => $short ? 'awaiting_stock' : 'pending',
            ]);

            return $order;
        });

        return redirect("/orders/{$order->id}");
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
