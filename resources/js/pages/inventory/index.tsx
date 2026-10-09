import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, Eye, Package, PackageMinus, PackagePlus, Plus, RefreshCcw, SquarePen, Trash } from 'lucide-react';
import inventory from '@/routes/inventory';
import { Badge } from "@/components/ui/badge"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
const emptyForm = { product_id: '', adjustment_type: '', quantity: '', reason: '' }
type Paginate<T> ={
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    }
}
type Props = {
    collection: Paginate<any>;
    products: { id: number; name: string }[];
    statistics: {
        total_adjustment: number;
        stock_added: number;
        stock_subtracted: number;
        total_product: number;
    };
    
}

export default function Index({ collection, products,statistics }: Props) {

    const adjustmentTypes = [
        { value: 'Addation', label: 'Addition ( + Stock In )' },
        { value: 'Subtraction', label: 'Subtraction ( - Stock In )' },
    ]
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const handlePageChange = (page: number) => {
        router.get('/inventory', { page }, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    const selectedProduct = products.find((p) => String(p.id) === String(data.product_id));
    const handleOpenModal = () => {
        setOpen(true);
        setData(emptyForm);
        setIsEdit(false);
        setEditId(null)
    };
    const handleCloseModal = () => {
        setOpen(false);
        setData(emptyForm)
        setIsEdit(false);
        setEditId(null)
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (isEdit && editId) {
            router.put(`/inventory/${editId}`, data, {
                onSuccess: handleCloseModal,
            });
        } else {
            router.post('/inventory', data, {
                onSuccess: handleCloseModal,
            });
        }

    };
    const handleEditMode = (stock: any) => {
        setData({
            product_id: stock.id,
            adjustment_type: stock.adjustment_type,
            reason: stock.reason,
            quantity: stock.quantity,

        });
        setOpen(true);
        setIsEdit(true);
        setEditId(stock.id)
    }

    const selectedAdjustType = adjustmentTypes.find(
        (type) => type.value === data.adjustment_type
    );
    const stockAddedCount = collection.data.filter(
        (item: any) => item.adjustment_type === 'Addation'
    ).length;
    const stockMinusCount = collection.data.filter(
        (item: any) => item.adjustment_type === 'Subtraction'
    ).length;
    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure to delete this stock adjustment?')) {
            router.delete(`/inventory/${id}`)
        }
    }
    return (
        <>
            <Head title="Stock Adjustment" />
            <div className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6 mb-4">
                <Button onClick={handleOpenModal} className='cursor-pointer'>
                    <Plus />
                    New Adjustment</Button>
            </div>
            <div className="flex md:flex-row gap-4 px-6 py-5 justify-start flex-col">
                <div className=" flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                         <div className="bg-gray-800 p-4 rounded-xl flex justify-center items-center" >
                            <RefreshCcw className='text-blue-500' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Adjustment</span>
                            <h1 className='text-2xl font-bold'>{statistics.total_adjustment}</h1>

                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#22b57356] p-4 rounded-xl flex justify-center items-center">
                            <PackagePlus className='text-green-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Stock Added ( + ) </span>
                            {stockAddedCount > 1 ? (
                                <h1 className='text-2xl font-bold'>{statistics.stock_added} items</h1>
                            ) :
                                <h1 className='text-2xl font-bold'>{statistics.stock_added} item</h1>
                            }


                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#ef44446c] p-4 rounded-xl flex justify-center items-center">
                            <PackageMinus className='text-red-300' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Stock Subtracted ( - )</span>
                            {stockMinusCount > 1 ? (
                                <h1 className='text-2xl font-bold'>{statistics.stock_subtracted}  items</h1>
                            ) :
                                <h1 className='text-2xl font-bold'>{statistics.stock_subtracted}  item</h1>
                            }


                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#f59f0b63] p-4 rounded-xl flex justify-center items-center">
                            <Package className='text-yellow-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Product </span>
                            <h1 className='text-2xl font-bold'>{statistics.total_product} </h1>

                        </div>
                    </div>

                </div>

            </div>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Product Affected</TableHead>
                            <TableHead>Adjustment Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead className='text-end'>Action</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center text-gray-400' colSpan={6}>You do not have stock yet</TableCell>
                            </TableRow>
                        ) : (collection.data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>#ADJ{item.id}</TableCell>
                                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>{item.product?.name}</TableCell>
                                <TableCell>

                                    {item.adjustment_type === 'Addation' ? (
                                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                            + Stock In
                                        </Badge>
                                    ) :
                                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                            - Stock Out
                                        </Badge>
                                    }
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.reason}</TableCell>
                                <TableCell className='flex items-center justify-end gap-x-2'>
                                    <Button variant="outline" onClick={() => handleDelete(item.id)}>
                                        <Trash className='text-red-500' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => {
                            e.preventDefault();
                            if (collection.meta.current_page > 1) {
                                handlePageChange(collection.meta.current_page - 1)
                            }
                        }} />
                    </PaginationItem>
                    {Array.from(
                        { length: collection.meta.last_page },
                        (_, index) => index + 1
                    ).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === collection.meta.current_page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();

                                if (collection.meta.current_page < collection.meta.last_page) {
                                    handlePageChange(collection.meta.current_page + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Update Adjustment' : 'New Adjusment'}</DialogTitle>
                        <DialogDescription>
                            Fill Your Adjusment Product Stocks Details
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className='my-5'>
                            <Field>
                                <Label>Product</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" type="button" className="w-full justify-between font-normal">
                                            {selectedProduct ? selectedProduct.name : 'Choose a product...'}
                                            <ChevronDown className="size-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel >Choose a product
                                            </DropdownMenuLabel>
                                            {products.length === 0 ? (
                                                <div className="px-2 py-1.5 text-sm text-gray-400">Add product first</div>
                                            ) : (
                                                <DropdownMenuRadioGroup
                                                    value={String(data.product_id)}
                                                    onValueChange={(value) => setData('product_id', value)}
                                                >
                                                    {products.map((p) => (
                                                        <DropdownMenuRadioItem key={p.id} value={String(p.id)}>
                                                            {p.name}
                                                        </DropdownMenuRadioItem>
                                                    ))}
                                                </DropdownMenuRadioGroup>
                                            )}

                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </Field>
                            <div className="flex flex-col gap-3 sm:flex-row ">
                                <div className="grid gap-3  w-50">
                                    <Label htmlFor="price">Adjustment Type</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" type="button" className="w-full justify-between font-normal">
                                                {selectedAdjustType ? selectedAdjustType.label : 'Choose type...'}
                                                <ChevronDown className="size-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                                            <DropdownMenuGroup>

                                                <DropdownMenuRadioGroup
                                                    value={String(data.adjustment_type)}
                                                    onValueChange={(value) => setData('adjustment_type', value)}
                                                >
                                                    {adjustmentTypes.map((p: any) => (
                                                        <DropdownMenuRadioItem key={p.value} value={p.value}>
                                                            {p.label}
                                                        </DropdownMenuRadioItem>
                                                    ))}
                                                </DropdownMenuRadioGroup>


                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="grid gap-3 ">
                                    <Label htmlFor="quantity">Adjust Quantity</Label>
                                    <Input id="quantity" name="quantity" onChange={(e) => setData('quantity', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="Reason">Reason</Label>
                                <Input id="Reason" name="Reason" onChange={(e) => setData('reason', e.target.value)} value={data.reason} />
                            </div>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Stock Adjustment',
            href: inventory.index().url
        },
    ],
};
