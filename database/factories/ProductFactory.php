<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
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
             'name' => fake()->randomElement([
                'Milo 1kg',
                'Maggi Kari',
                'Gardenia Bread',
                'Mineral Water',
                'Nescafe Classic',
                'Indomie Mi Goreng',
                'Dutch Lady Milk',
                'Coca-Cola 1.5L',
                'Biskut Oreo',
                'Beras Jasmine 5kg',
                'Minyak Masak 1kg',
                'Gula Pasir 1kg',
                'Tepung Gandum 1kg',
                'Telur Ayam 10 biji',
                'Roti Krim',
                'Kopi Aik Cheong',
                'Teh Boh',
                'Sardin Ayam Brand',
                'Kicap Manis',
                'Sos Cili Maggi',
            ]),
            'price' => fake()->randomFloat(2, 5, 200),
            'low_stock_threshold' => 10,
            'is_active' => true,
        ];
    }
}
