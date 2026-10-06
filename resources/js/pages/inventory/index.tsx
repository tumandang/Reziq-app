import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
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
import { Product } from '@/types';
import { ChevronDown, Eye, Plus, SquarePen, Trash } from 'lucide-react';
import inventory from '@/routes/inventory';

const emptyForm = { product_id: '', adjustment_type: '', quantity: '', reason: '' }
type Props = {
    collection: { data: any[] }
    products: { id: number; name: string }[]
}

export default function Index({ collection, products }: Props) {
    const adjustmentTypes = [
    { value: 'addition', label: 'Addition ( + Stock In )' },
    { value: 'subtraction', label: 'Subtraction ( - Stock In )' },
]
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
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
            router.put(`/products/${editId}`, data, {
                onSuccess: handleCloseModal,
            });
        } else {
            router.post('/products', data, {
                onSuccess: handleCloseModal,
            });
        }

    };
    const selectedAdjustType = adjustmentTypes.find(
    (type) => type.value === data.adjustment_type
);

    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure to delete this product?')) {
            router.delete(`/products/${id}`)
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
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Adjustment</span>
                            <h1 className='text-2xl font-bold'>{collection.data.length}</h1>
                            <p className='text-xs'>This Month</p>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Stock Added ( + ) </span>
                            <h1 className='text-2xl font-bold'>45 items</h1>
                            <p className='text-xs'>This Month</p>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">

                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Stock Subtracted ( - )</span>
                            <h1 className='text-2xl font-bold'>18 items</h1>
                            <p className='text-xs'>Damaged / Expired</p>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Product </span>
                            <h1 className='text-2xl font-bold'>15</h1>
                            <p className='text-xs'>Product Stock Adjusment</p>
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
                                <TableCell>#PRD{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>RM {item.price}</TableCell>
                                <TableCell>{item.low_stock_threshold}</TableCell>
                                <TableCell className='flex items-center justify-end gap-x-2'>
                                    <Button variant="outline" title='View'>
                                        <Eye />
                                    </Button>
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Update Product' : 'New Adjusment'}</DialogTitle>
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
                                <div className="grid gap-3  w-5/6">
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
                                    <Input id="quantity" name="quantity" />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                    <Label htmlFor="Reason">Reason</Label>
                                    <Input id="Reason" name="quantity" />
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
