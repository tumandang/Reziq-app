<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResources;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Customer::query();
        if ($request->search){
            $query->where('name','like',"%{$request->search}%")->orWhere('phone','like',"%{$request->search}%");
        }
        $searchproduct = $query->orderBy('id', 'DESC')->paginate(7)->withQueryString();
;
        return Inertia::render('customers/index', [
            'collection' => CustomerResources::collection(
                $searchproduct
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $request->user()->customers()->create($this->validated($request));
        return redirect('/customers')->with('message', 'Customer Added !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $this->ownerOnly($request, $customer);
        $customer->update($this->validated($request));
        return redirect('/customers')->with('message', 'Customer Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,  Customer $customer)
    {
        $this->ownerOnly($request, $customer);
        $customer->delete();

        return redirect('/customers')->with('message','Customer Deleted!');
    }

     private function ownerOnly(Request $request, Customer $customer): void
    {
        abort_unless($customer->user_id === $request->user()->id, 403);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'notes' => ['nullable', 'string', 'min:0'],
            'address' => ['required', 'string', 'min:0'],
            'phone' => ['required', 'string', 'min:0'],
        ]);
    }
    
}
