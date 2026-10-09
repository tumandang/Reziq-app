<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Http\Requests\StoreInventoryRequest;
use App\Http\Requests\UpdateInventoryRequest;
use App\Http\Resources\InventoryResources;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $totalAdjustment = Inventory::whereHas(
            'product',
            fn($q) => $q->where('user_id', $request->user()->id)
        )->count();

        $stockAddedCount = Inventory::whereHas(
            'product',
            fn($q) => $q->where('user_id', $request->user()->id)
        )->where('adjustment_type', 'Addation')->count();

        $stockMinusCount = Inventory::whereHas(
            'product',
            fn($q) => $q->where('user_id', $request->user()->id)
        )->where('adjustment_type', 'Subtraction')->count();

        return Inertia::render('inventory/index', [
            'collection' => InventoryResources::collection(
                Inventory::with('product')
                    ->whereHas(
                        'product',
                        fn($q) => $q->where('user_id', $request->user()->id)
                    )
                    ->latest('id')
                    ->paginate(7)
            ),

            'products' => $request->user()
                ->products()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'statistics' => [
                'total_adjustment' => $totalAdjustment,
                'stock_added' => $stockAddedCount,
                'stock_subtracted' => $stockMinusCount,
                'total_product' => $request->user()->products()->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInventoryRequest $request)
    {
        $data = $request->validated();
        $product = $request->user()->products()->findOrFail($data['product_id']);
        $product->inventory()->create($data);
        $refresh = Product::withStock()->find($product->id);
        $product->is_active = $refresh->stock > 0;
        $product->save();
        return redirect('/inventory')->with('message', 'Inventory Adjusted !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory, Request $request)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInventoryRequest $request, Inventory $inventory)
    {
        $this->ownerOnly($request, $inventory);
        $inventory->update($this->validated($request));
        return redirect('/inventory')->with('message', 'Stock Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Inventory $inventory)
    {
        $this->ownerOnly($request, $inventory);
        $inventory->delete();

        return redirect('/inventory')->with('message', 'Product Deleted!');
    }

    private function ownerOnly(Request $request, Inventory $inventory): void
    {
        abort_unless($inventory->product->user_id === $request->user()->id, 403);
    }
}
