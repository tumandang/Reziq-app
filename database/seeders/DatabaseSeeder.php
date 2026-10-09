<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'DanishDanial',
            'email' => 'danishdanial0991@gmail.com',
        ]);

        $customers = Customer::factory(12)->create(['user_id' => $user->id]);
        $products = Product::factory(10)->create(['user_id' => $user->id]);

        // Opening stock; the last 3 products start low to test the low-stock count
        foreach ($products as $i => $product) {
            Inventory::create([
                'product_id' => $product->id,
                'adjustment_type' => 'Addation',
                'reason' => 'Opening stock',
                'quantity' => $i >= 17 ? rand(5, 12) : rand(150, 300),
            ]);
        }

        foreach (range(1, 60) as $n) {
            $date = now()->subDays(rand(0, 180))->setTime(rand(8, 20), rand(0, 59));
            $status = fake()->randomElement(['pending', 'processing', 'completed', 'completed', 'completed', 'cancelled']);

            $order = Order::factory()->create([
                'user_id' => $user->id,
                'customer_id' => $customers->random()->id,
                'status' => $status,
                'order_date' => $date,
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            $subtotal = 0;
            foreach ($products->random(rand(1, 4)) as $product) {
                $qty = rand(1, 5);
                $line = round($product->price * $qty, 2);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'unit_price' => $product->price,
                    'total_price' => $line,
                ]);

                if ($status !== 'cancelled') {
                    Inventory::create([
                        'product_id' => $product->id,
                        'adjustment_type' => 'Subtraction',
                        'reason' => "Order #{$order->id}",
                        'quantity' => $qty,
                    ]);
                }

                $subtotal += $line;
            }

            $shipping = fake()->randomElement([0, 5, 8, 10]);
            $total = $subtotal + $shipping;

            $order->update([
                'subtotal' => $subtotal,
                'shipping_cost' => $shipping,
                'total_amount' => $total,
            ]);

            Payment::create([
                'order_id' => $order->id,
                'amount' => $total,
                'payment_method' => fake()->randomElement(['QR_Code', 'bank_transfer', 'cod', 'online_banking']),
                'status' => match ($status) {
                    'completed' => 'completed',
                    'cancelled' => 'failed',
                    default => 'pending',
                },
                'paid_at' => $status === 'completed' ? $date->copy()->addHours(2) : null,
            ]);

            Shipment::create([
                'order_id' => $order->id,
                'courier_name' => fake()->randomElement(['J&T', 'Pos Laju', 'Ninja Van', 'DHL']),
                'tracking_number' => strtoupper(fake()->bothify('??########')),
                'address' => $order->customer->address,
                'status' => match ($status) {
                    'completed' => 'delivered',
                    'processing' => 'shipped',
                    default => 'pending',
                },
                'shipped_at' => in_array($status, ['processing', 'completed']) ? $date->copy()->addDay() : null,
                'delivered_at' => $status === 'completed' ? $date->copy()->addDays(3) : null,
            ]);
        }
    }
}
