import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order, Shipment } from '@/types';
import orders from '@/routes/orders';
import { CircleAlert, CircleCheckBig, DollarSign, Plus, Search, SquarePen, Trash, TrendingUp, Truck } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Field,
    FieldGroup,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from '@/components/ui/badge';
import OrderDetailsDialog from './order-details-dialog';
type Props = {
    collection: { data: Order[], shipment: Shipment };
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
const statusOrder = [
    {
        value: "pending",
        id: "status=pending",
        label: statusLabel.pending,
        description: "Waiting for order confirmation",
        badge: "Default",
    },
    {
        value: "awaiting_stock",
        id: "status=awaiting_stock",
        label: statusLabel.awaiting_stock,
        description: "Waiting for stock availability",
        badge: "Stock",
    },
    {
        value: "processing",
        id: "status=processing",
        label: statusLabel.processing,
        description: "Order is being processed",
        badge: "In Progress",
    },
    {
        value: "completed",
        id: "status=completed",
        label: statusLabel.completed,
        description: "Order has been completed",
        badge: "Done",
    },
    {
        value: "cancelled",
        id: "status=cancelled",
        label: statusLabel.cancelled,
        description: "Order has been cancelled",
        badge: "Cancelled",
    },
];

export default function Index({ collection }: Props) {
    const emptyForm = { id: '', status:'' }
    const { data, setData } = useForm(emptyForm);
    const [editId, setEditId] = useState(null);
    const [deliveryTime, setDeliveryTime] = useState("asap")
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const handleCloseModal = () => {
        setOpen(false);
        setData(emptyForm)
        setEditId(null)
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();

        router.put(`/orders/${editId}`, data, {
            onSuccess: handleCloseModal
        });


    };
    const handleEditMode = (order: any) => {
        setData({
            status: order.status

        });
        setOpen(true);
        setEditId(order.id)
    }
    const [selected, setSelected] = useState<Order | null>(null);
    const openDetails = (order: Order) => {
    setSelected(order);
    setOpen1(true);
};
    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure to delete this order?')) {
            router.delete(`/orders/${id}`)
        }
    }
    const totalSales = collection.data.filter((item) => item.status === 'completed').reduce((sum, item) => sum + Number(item.subtotal), 0);
    const totalCancel = collection.data.filter((item) =>item.status ==='cancelled').length;
    const totalProcess = collection.data.filter((item) =>item.status ==='processing').length;
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
                            <span className='text-xs uppercase'>Total Sales</span>
                            <h1 className='text-2xl font-bold'>
                                RM {totalSales}
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
                            <span className='text-xs uppercase'>Processing Order</span>
                            <h1 className='text-2xl font-bold'>{totalProcess}</h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#ef44446c] p-4 rounded-xl flex justify-center items-center">
                            <CircleAlert className='text-red-300' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Cancel Order</span>
                            <h1 className='text-2xl font-bold'>{totalCancel}</h1>
                        </div>
                    </div>

                </div>

            </div>

            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order No.</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead>Shipping Cost</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="">Action</TableHead>
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
                                    <TableCell>#ORD{item.id}</TableCell>
                                    <TableCell>{item.customer?.name}</TableCell>
                                    <TableCell>{new Date(item.order_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.items_count}</TableCell>
                                    <TableCell>RM {item.subtotal}</TableCell>
                                    <TableCell>RM {item.shipping_cost}</TableCell>

                                    <TableCell>
                                        <span className={`rounded px-2 py-1 text-xs ${statusColor[item.status]}`}>
                                            {statusLabel[item.status] ?? item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="flex items-center justify-start gap-x-2">
                                        <Button variant="outline" title='Shipment' onClick={() => openDetails(item)}>
                                            <Truck className='text-yellow-300' />
                                        </Button>
                                        <Button variant="outline" title='Edit' onClick={() => handleEditMode(item)}>
                                            <SquarePen className='text-green-600' />
                                        </Button>
                                        <Button variant="outline" title='Delete' onClick={() => handleDelete(item.id)}>
                                            <Trash className='text-red-500' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <Drawer open={open} onOpenChange={setOpen} direction="right" >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Update Status Order</DrawerTitle>
                        <DrawerDescription>
                            Change the status of the order
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 scroll-fade overflow-y-auto p-4">
                        <RadioGroup value={data.status} onValueChange={(value)=> setData('status',value)} className="gap-2" >
                            {statusOrder.map((time) => (
                                <FieldLabel key={time.value} htmlFor={time.id}>
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle className="flex items-center gap-2">
                                                {time.label}
                                                {time.badge ? (
                                                    <Badge variant="secondary">{time.badge}</Badge>
                                                ) : null}
                                            </FieldTitle>
                                            <FieldDescription>{time.description}</FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value={time.value} id={time.id} />
                                    </Field>
                                </FieldLabel>
                            ))}
                        </RadioGroup>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSubmit} className="h-[34px]">
                            Update Status Order
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <OrderDetailsDialog order={selected} open={open1} onOpenChange={setOpen1}/>
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