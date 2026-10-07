import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types';
import orders from '@/routes/orders';
import { CheckCircle, CircleAlert, CircleCheckBig, DollarSign, Plus, Search, TrendingUp } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type Props = {
    collection: { data: Order[] };
};

const statusLabel: Record<Order['status'], string> = {
    pending: 'Pending',
    awaiting_stock: 'Awaiting stock',
    processing: 'Processing',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

const statusColor: Record<Order['status'], string> = {
    pending: 'bg-gray-500/15 text-gray-400',
    awaiting_stock: 'bg-amber-500/15 text-amber-500',
    processing: 'bg-blue-500/15 text-blue-500',
    completed: 'bg-green-500/15 text-green-500',
    cancelled: 'bg-red-500/15 text-red-500',
};

export default function Index({ collection }: Props) {
    return (
        <>
            <Head title="Orders" />

            <div className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6">
                <Link href="/orders/create" className="rounded-lg bg-white px-3 py-2 text-sm text-black flex text-center justify-center">
                    
                    Create New order
                </Link>
            </div>

            <div className="flex md:flex-row gap-4 px-6 py-5 justify-start flex-col">
                <div className=" flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-gray-800 p-4 rounded-xl flex justify-center items-center" >
                            <TrendingUp className='text-blue-500' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Sales</span>
                            <h1 className='text-2xl font-bold'>{collection.data.length}</h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#22b57356] p-4 rounded-xl flex justify-center items-center">
                            <DollarSign className='text-green-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Revenue</span>
                            <h1 className='text-2xl font-bold'>
                            </h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#f59f0b63] p-4 rounded-xl flex justify-center items-center">
                            <CircleCheckBig className='text-yellow-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Net Profit</span>
                            <h1 className='text-2xl font-bold'></h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#ef44446c] p-4 rounded-xl flex justify-center items-center">
                            <CircleAlert className='text-red-300' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Unpaid</span>
                            <h1 className='text-2xl font-bold'></h1>
                        </div>
                    </div>

                </div>

            </div>
            <div className="px-6">
                <InputGroup className="flex-1">
                    <InputGroupInput placeholder="Search Orders..."  />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>

                </InputGroup>
            </div>

            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order No.</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-end">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center text-muted-foreground" colSpan={6}>
                                    You do not have any orders yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            collection.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.order_number}</TableCell>
                                    <TableCell>{item.customer?.name}</TableCell>
                                    <TableCell>{item.items_count}</TableCell>
                                    <TableCell>RM {Number(item.total_amount).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={`rounded px-2 py-1 text-xs ${statusColor[item.status]}`}>
                                            {statusLabel[item.status] ?? item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="flex items-center justify-end gap-x-2">
                                        <Button asChild variant="outline">
                                            <Link href={orders.show(item.id).url}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: orders.index().url,
        },
    ],
};