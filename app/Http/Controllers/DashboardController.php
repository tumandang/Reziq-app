<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $thisStart = now()->startOfMonth();
        $lastStart = now()->subMonthNoOverflow()->startOfMonth();
        $lastEnd = now()->subMonthNoOverflow()->endOfMonth();

        $orders = fn() => $user->orders()->where('status', '!=', 'cancelled');
        $pct = fn($cur, $prev) => $prev > 0 ? round((($cur - $prev) / $prev) * 100, 1) : null;

        $revenueNow = (float) $orders()->where('order_date', '>=', $thisStart)->sum('subtotal');
        $revenuePrev = (float) $orders()->whereBetween('order_date', [$lastStart, $lastEnd])->sum('subtotal');
        $salesNow = $orders()->where('order_date', '>=', $thisStart)->count();
        $salesPrev = $orders()->whereBetween('order_date', [$lastStart, $lastEnd])->count();


        $customers = Customer::where('user_id', $user->id);
        $customersTotal = (clone $customers)->count();
        $customersNow = (clone $customers)->where('created_at', '>=', $thisStart)->count();
        $customersPrev = (clone $customers)->whereBetween('created_at', [$lastStart, $lastEnd])->count();


        $cod = $user->orders()->where('status', '!=', 'cancelled')->where('order_date', '>=', $thisStart)
            ->whereHas('payment', fn($q) => $q->where('payment_method', 'cod'));
        $pendingPay = $orders()->where('status', 'pending');

        $lowStock = Product::withStock()->where('user_id', $user->id)
            ->get()
            ->filter(fn($p) => $p->stock <= $p->low_stock_threshold)
            ->count();


        $awaiting = $user->orders()->where('status', 'awaiting_stock')->count();
        $totalCost = (float) $user->orders()
            ->where('status', '!=', 'cancelled')
            ->where('order_date', '>=', $thisStart)
            ->sum('shipping_cost');

        $months = collect(range(5, 0))->map(fn($i) => now()->subMonthsNoOverflow($i)->startOfMonth());
        $byMonth = $orders()
            ->where('order_date', '>=', $months->first())
            ->get(['order_date', 'total_amount'])
            ->groupBy(fn($o) => $o->order_date->format('Y-m'))
            ->map->sum('total_amount');

        $months = collect(range(5, 0))->map(fn($i) => now()->subMonthsNoOverflow($i)->startOfMonth());

        $byMonth = $orders()
            ->where('order_date', '>=', $months->first())
            ->get(['order_date', 'total_amount', 'shipping_cost'])
            ->groupBy(fn($o) => $o->order_date->format('Y-m'));

        $chart = $months->map(function ($m) use ($byMonth) {
            $group = $byMonth->get($m->format('Y-m'), collect());

            return [
                'month' => $m->format('F'),
                'revenue' => (float) $group->sum('total_amount'),
                'orders' => $group->count(),
            ];
        })->values();

        return Inertia::render('dashboard', [
            'summary' => [
                'revenue' => ['value' => $revenueNow, 'change' => $pct($revenueNow, $revenuePrev)],
                'customers' => ['value' => $customersTotal, 'change' => $pct($customersNow, $customersPrev)],
                'sales' => ['value' => $salesNow, 'change' => $pct($salesNow, $salesPrev)],
                'awaiting' => ['value' => $totalCost, 'change' => null],
            ],
            'breakdown' => [
                'sales' => ['count' => $salesNow, 'amount' => $revenueNow],
                'lowStock' => $lowStock,
                'cod' => ['count' => (clone $cod)->count(), 'amount' => (float) (clone $cod)->sum('subtotal')],
                'pending' => ['count' => (clone $pendingPay)->count(), 'amount' => (float) (clone $pendingPay)->sum('subtotal')],
            ],
            'chart' => $chart,
            'trend' => $pct($revenueNow, $revenuePrev),
            'period' => now()->format('F Y'),
        ]);
    }
}
