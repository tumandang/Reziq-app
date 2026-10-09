<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // CustomerFactory
        return [
            'user_id' => User::factory(),
            'name' => fake('ms_MY')->name(),
            'phone' => fake()->numerify('01########'),
            'address' => fake('ms_MY')->address(),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
