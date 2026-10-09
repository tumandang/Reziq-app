<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'customer_id' => Customer::factory(),
            'status' => 'pending',
            'order_date' => now(),
            'subtotal' => 0,
            'shipping_cost' => 0,
            'total_amount' => 0,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
