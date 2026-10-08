<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;
        return [
            'customer_id' => ['required', Rule::exists('customers', 'id')->where('user_id', $userId)],
            'notes' => ['nullable', 'string'],
            'payment_method' => ['required', 'in:QR_Code,bank_transfer,cod,online_banking'],
            'payment_status' => ['required', 'in:pending,completed,failed,refunded'],
            'shipping_cost' => ['nullable', 'numeric', 'min:0'],
            'address' => ['required', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', Rule::exists('products', 'id')->where('user_id', $userId)],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'courier_name' => ['nullable', 'string'],
            'tracking_number' => ['nullable', 'string'],
            'order_date' => ['date']
        ];
    }
}
