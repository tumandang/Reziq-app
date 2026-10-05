import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types';
import orders from '@/routes/orders';

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
                <Link href="/orders/create" className="rounded-lg bg-white px-3 py-2 text-sm text-black">
                    Create New order
                </Link>
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