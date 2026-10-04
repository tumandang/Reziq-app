<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResources;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request)
    {
        return Inertia::render('products/index', [
            'collection' => ProductResources::collection(
                Product::orderBy('id', 'DESC')->get(),
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/form', ['products' => null]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $request->user()->products()->create($this->validated($request));

        return redirect('/products')->with('message','Product Added !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request , Product $product)
    {
        $this->ownerOnly($request, $product);

        return Inertia::render('products/form', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->ownerOnly($request, $product);
        $product->update($this->validated($request));
        return redirect('/products')->with('message', 'Product Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , Product $product)
    {
        $this->ownerOnly($request, $product);
        $product->delete();

        return redirect('/products')->with('message','Product Deleted!');
    }

    private function ownerOnly(Request $request, Product $product): void
    {
        abort_unless($product->user_id === $request->user()->id, 403);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);
    }
}
