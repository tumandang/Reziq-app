import { Head, router, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import products from '@/routes/products/index.js';
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

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types';
import { SquarePen, Trash } from 'lucide-react';





const emptyForm = { id: '', name: '', desc: '', cost: '', price: '', stock: '', low_stock_threshold: '' }
type Props = {
    collection: Product
}

export default function Index({ collection }: Props) {

    const [open, setOpen] = useState(false);
    const { data, setData } = useForm(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
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
            desc: product.desc,
            cost: product.cost,
            price: product.price,
            stock: product.stock,
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

    return (
        <>
            <Head title="Products" />
            <div className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6">
                <Button onClick={handleOpenModal}>Add Product</Button>
            </div>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Low Stock Threshold</TableHead>
                            <TableHead className='text-end'>Action</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center text-gray-400' colSpan={6}>You do not have customer yet</TableCell>
                            </TableRow>
                        ) : (collection.data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>#PRD{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>RM {item.cost}</TableCell>
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
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </Field>
                            <Field>
                                <Label htmlFor="desc">Description</Label>
                                <Textarea id='desc' value={data.desc} placeholder="Description of the product (optional)" className='resize-none' onChange={(e) => setData('desc', e.target.value)} />
                            </Field>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="grid gap-3">
                                    <Label htmlFor="cost">Cost</Label>
                                    <Input id="cost" value={data.cost} name="cost" onChange={(e) => setData('cost', e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" name="price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row mb-5">
                                <div className="grid gap-3">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input id="stock" name="stock" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
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
