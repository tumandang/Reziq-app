import { Head, router, useForm } from '@inertiajs/react';
import products from '@/routes/products/index.js';
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

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types';
import { Box, Check, Plus, Search, SquarePen, Trash, TrendingDown, TrendingUp, TriangleAlert, X } from 'lucide-react';





const emptyForm = { id: '', name: '', price: '', low_stock_threshold: '' }
type Props = {
    collection: Product
}

export default function Index({ collection }: Props) {

    const [open, setOpen] = useState(false);
    const { data, setData } = useForm(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    console.log(search);
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

    const handleEditMode = (product: any) => {
        setData({
            id: product.id,
            name: product.name,
            price: product.price,
            low_stock_threshold: product.low_stock_threshold

        });
        setOpen(true);
        setIsEdit(true);
        setEditId(product.id)
    }

    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure to delete this product?')) {
            router.delete(`/products/${id}`)
        }
    }

    const inStockCount = collection.data.filter(
        (item: any) => item.stock > item.low_stock_threshold && item.stock > item.low_stock_threshold  + 3
    ).length;

    const outStockCount = collection.data.filter(
        (item:any) => item.stock === 0
    ).length;

    const LowStockCount = collection.data.filter(
        (item:any) => item.stock === item.low_stock_threshold || item.stock < item.low_stock_threshold  + 3 && item.stock !== 0
    ).length;


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            router.get('products', { search }, {
                preserveState: true,
                replace: true
            });
        });
        return () => clearTimeout(timeOutId);
    }, [search])
    return (
        <>
            <Head title="Products" />
            <div className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6 mb-4">
                <Button onClick={handleOpenModal} className='cursor-pointer'>
                    <Plus />
                    New Product</Button>
            </div>
            <div className="flex md:flex-row gap-4 px-6 py-5 justify-start flex-col">
                <div className=" flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-gray-800 p-4 rounded-xl flex justify-center items-center" >
                            <Box className='text-blue-500' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Total Products</span>
                            <h1 className='text-2xl font-bold'>{collection.data.length}</h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#22b57356] p-4 rounded-xl flex justify-center items-center">
                            <Check className='text-green-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>In Stock</span>
                            <h1 className='text-2xl font-bold'>{inStockCount}
                            </h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#f59f0b63] p-4 rounded-xl flex justify-center items-center">
                            <TriangleAlert className='text-yellow-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Low Stock</span>
                            <h1 className='text-2xl font-bold'>{LowStockCount}</h1>
                        </div>
                    </div>

                </div>
                <div className="flex-1 p-6 border rounded-xl  bg-[#171717]">
                    <div className="flex flex-row space-x-5">
                        <div className="bg-[#ef44446c] p-4 rounded-xl flex justify-center items-center">
                            <X className='text-red-300' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className='text-xs uppercase'>Out of stock</span>
                            <h1 className='text-2xl font-bold'>{outStockCount}</h1>
                        </div>
                    </div>

                </div>

            </div>
            <div className="px-6">

                {/* <Field orientation="horizontal">
                    <Search />

                    <Input type="search" placeholder="Search Product..." />
                </Field> */}
                <InputGroup className="flex-1">
                    <InputGroupInput placeholder="Search Product..." onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>

                </InputGroup>




            </div>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Low Stock Threshold</TableHead>
                            <TableHead className='text-end'>Action</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center text-gray-400' colSpan={6}>You do not have product yet</TableCell>
                            </TableRow>
                        ) : (collection.data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>#PRD{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>RM {item.price}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{item.low_stock_threshold}</TableCell>
                                <TableCell className='flex items-center justify-end gap-x-2'>
                                    <Button variant="outline" title='Edit' onClick={() => handleEditMode(item)}>
                                        <SquarePen className='text-green-600' />
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
                        <DialogTitle>{isEdit ? 'Update Product' : 'Create Product'}</DialogTitle>
                        <DialogDescription>
                            Fill Your Product Details
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className='my-5'>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </Field>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="grid gap-3">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" name="price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
                                    <Input id="low_stock_threshold" name="low_stock_threshold" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} />
                                </div>
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
            title: 'Products',
            href: products.index().url
        },
    ],
};
