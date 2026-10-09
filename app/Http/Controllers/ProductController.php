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
    public function index(Request $request)
    {

        $query = $request->user()->products()->withStock();
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%");
        }
        $searchproduct = $query->orderBy('id', 'DESC')->paginate(7);
        $all = $request->user()->products()->withStock()->get();

        $stat = [
            'total_product' => $all->count(),
            'out_of_stock'  => $all->filter(fn($p) => $p->stock <= 0)->count(),
            'low_stock'     => $all->filter(fn($p) => $p->stock > 0 && $p->stock <= $p->low_stock_threshold + 3)->count(),
            'in_stock'      => $all->filter(fn($p) => $p->stock > $p->low_stock_threshold && $p->stock > $p->low_stock_threshold + 3)->count(),
        ];
        return Inertia::render('products/index', [
            'collection' => ProductResources::collection(
                $searchproduct

            ),
            'statistics' => $stat
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

        return redirect('/products')->with('message', 'Product Added !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Product $product)
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
    public function destroy(Request $request, Product $product)
    {
        $this->ownerOnly($request, $product);
        $product->delete();

        return redirect('/products')->with('message', 'Product Deleted!');
    }

    private function ownerOnly(Request $request, Product $product): void
    {
        abort_unless($product->user_id === $request->user()->id, 403);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'price' => ['required', 'numeric', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);
    }
}
