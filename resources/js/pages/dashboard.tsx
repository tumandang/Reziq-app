import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { AlertCircle, Banknote, CircleDollarSign, CreditCard, DollarSign, DollarSignIcon, Loader, TrendingDown, TrendingUp, Truck, Users, X } from 'lucide-react';
import { SummaryCard } from '@/components/ui/summary-card';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartLineMultiple } from '@/components/chart';

const summaryData = [
    { title: "Total Revenue", icon: DollarSign, value: "RM2333" },
    { title: "Total Customers", icon: Users, value: "+3823" },
    { title: "Sales", icon: CreditCard, value: "+129090" },
    { title: "Cost", icon: TrendingDown, value: "RM123" },

]
interface Props {
    summary: Record<'revenue' | 'customers' | 'sales' | 'awaiting', { value: number; change: number | null }>;
    breakdown: {
        sales: { count: number; amount: number };
        lowStock: number;
        cod: { count: number; amount: number };
        pending: { count: number; amount: number };
    };
    chart: { month: string; revenue: number; orders: number }[];
    trend: number | null;
    period: string;
}
const rm = (n: number) => `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export default function Dashboard({ summary, breakdown, chart, trend, period }: Props) {
    const cards = [
        { title: 'Revenue (this month)', icon: DollarSign, value: rm(summary.revenue.value), change: summary.revenue.change },
        { title: 'Total Customers', icon: Users, value: String(summary.customers.value), change: summary.customers.change },
        { title: 'Sales (this month)', icon: CreditCard, value: String(summary.sales.value), change: summary.sales.change },
        { title: 'Total Cost', icon: Banknote, value: rm(summary.awaiting.value), change: null },
    ];

    const rows = [
        { icon: CircleDollarSign, title: 'Total Sales', sub: `${breakdown.sales.count} Sales`, value: rm(breakdown.sales.amount) },
        
        { icon: Truck, title: 'Total COD', sub: `${breakdown.cod.count} Orders`, value: rm(breakdown.cod.amount) },
        { icon: Loader, title: 'Pending ', sub: `${breakdown.pending.count} Orders`, value: rm(breakdown.pending.amount) },
        { icon: AlertCircle, title: 'Low Stock', sub: 'Low stock products', value: String(breakdown.lowStock) },
    ];
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map(c => <SummaryCard key={c.title} {...c} />)}
                </div>
                <div className="mt-5 grid grid-cols-4 gap-4 ">
                    <div className="col-span-3">
                        <ChartLineMultiple data={chart} trend={trend} period={period} />
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className='font-lexend'>Revenue Breakdown</CardTitle>
                            <CardDescription className='font-dm-sans'>Breakdown of this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[250px] flex-col gap-y-4">
                                {rows.map(r => (
                                    <div key={r.title} className="flex flex-1 flex-row rounded-xl bg-muted px-4 py-2">
                                        <div className="flex items-center gap-x-2">
                                            <r.icon className="h-6 w-6" />
                                            <div className="flex flex-col">
                                                <h2 className="text-sm font-bold font-lexend">{r.title}</h2>
                                                <p className="text-xs text-muted-foreground font-dm-sans">{r.sub}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-center justify-end font-semibold">{r.value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                     
                    </Card>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
