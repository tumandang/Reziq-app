import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { AlertCircle, CircleDollarSign, CreditCard, DollarSign, DollarSignIcon, Loader, TrendingDown, TrendingUp, Truck, Users } from 'lucide-react';
import { SummaryCard } from '@/components/ui/summary-card';
import { Chart } from '@/components/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const summaryData = [
    { title: "Total Revenue", icon: DollarSign, value: "RM2333" },
    { title: "Total Customers", icon: Users, value: "+3823" },
    { title: "Sales", icon: CreditCard, value: "+129090" },
    { title: "Cost", icon: TrendingDown, value: "RM123" },

]
export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {summaryData.map((item) => (
                        <SummaryCard
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                            value={item.value}

                        />
                    ))}
                </div>
                <div className="mt-5 grid grid-cols-4 gap-4 ">
                    <div className="col-span-3">
                        <Chart />
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Breakdown</CardTitle>
                            <CardDescription>Breakdown of this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4 h-[250px]">
                                <div className="bg-[#171717] px-4 py-2 flex flex-row flex-1 rounded-xl">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <CircleDollarSign className='w-6 h-6 text-white' />
                                        <div className="flex flex-col ">
                                            <h2 className='text-sm font-bold'>Total Sales</h2>
                                            <p className='text-xs text-muted-foreground'> 765 Sales</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end text-end  flex-1 font-semibold">
                                        RM 2123
                                    </div>
                                </div>
                                <div className="bg-[#171717] px-4 py-2 flex flex-row flex-1 rounded-xl">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <AlertCircle className='w-6 h-6 text-white' />
                                        <div className="flex flex-col ">
                                            <h2 className='text-sm font-bold'>Low Stock</h2>
                                            <p className='text-xs text-muted-foreground'>Low Stock Product</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end text-end  flex-1 font-semibold">
                                        04
                                    </div>
                                </div>
                                <div className="bg-[#171717] px-4 py-2 flex flex-row flex-1 rounded-xl">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <Truck className='w-6 h-6 text-white' />
                                        <div className="flex flex-col ">
                                            <h2 className='text-sm font-bold'>Total COD</h2>
                                            <p className='text-xs text-muted-foreground'> 765 Orders</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end text-end  flex-1 font-semibold">
                                        RM 23
                                    </div>
                                </div>
                                <div className="bg-[#171717] px-4 py-2 flex flex-row flex-1 rounded-xl">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <Loader className='w-6 h-6 text-white' />
                                        <div className="flex flex-col ">
                                            <h2 className='text-sm font-bold'>Pending Payment</h2>
                                            <p className='text-xs text-muted-foreground'> 76 Orders</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end text-end  flex-1 font-semibold">
                                        RM 123
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full items-start gap-2 text-sm">
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2 leading-none font-medium">
                                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                    </div>
                                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                        January 2026
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
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
