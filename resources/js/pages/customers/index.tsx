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
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Customer } from '@/types';
import { Plus, Search, SquarePen, Trash } from 'lucide-react';
import customers from '@/routes/customers';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';





const emptyForm = { id: '', name: '', address: '', notes: '', phone: '', }
type Props = {
    collection: Customer
}

export default function Index({ collection }: Props) {

    const [open, setOpen] = useState(false);
    const { data, setData } = useForm(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
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
            router.put(`/customers/${editId}`, data, {
                onSuccess: handleCloseModal,
            });
        } else {
            router.post('/customers', data, {
                onSuccess: handleCloseModal,
            });
        }

    };

    const handleEditMode = (customer: any) => {
        setData({
            id: customer.id,
            name: customer.name,
            notes: customer.notes,
            address: customer.address,
            phone: customer.phone,

        });
        setOpen(true);
        setIsEdit(true);
        setEditId(customer.id)
    }

    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure to delete this customers?')) {
            router.delete(`/customers/${id}`)
        }
    }
        useEffect(() => {
            const timeOutId = setTimeout(() => {
                router.get('customers', { search }, {
                    preserveState: true,
                    replace: true
                });
            });
            return () => clearTimeout(timeOutId);
        }, [search])

    return (
        <>
            <Head title="Customers" />
            <div className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6">
                <Button onClick={handleOpenModal}>
                    < Plus/>
                    Add New Customer</Button>
            </div>
            <div className="p-6">
                <InputGroup className="flex-1">
                    <InputGroupInput placeholder="Search Customers or Phone Number ...." onChange={(e) => {
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
                            <TableHead>Customer ID</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className='text-end'>Action</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center text-gray-400' colSpan={6}>You do not have customer yet</TableCell>
                            </TableRow>
                        ) : (
                            collection.data.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>#CUST{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.notes}</TableCell>
                                    <TableCell className='flex items-center justify-end gap-x-2'>
                                        <Button variant="outline" title='Edit' onClick={() => handleEditMode(item)}>
                                            <SquarePen className='text-green-600' />
                                        </Button>
                                        <Button variant="outline" onClick={() => handleDelete(item.id)}>
                                            <Trash className='text-red-500' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}


                    </TableBody>
                </Table>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Update Customer' : 'Create Customer'}</DialogTitle>
                        <DialogDescription>
                            Fill Your Customer Details
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className='mb-5'>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input id="name-1" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="cost">Phone Number</Label>
                                    <Input id="cost" value={data.phone} name="cost" onChange={(e) => setData('phone', e.target.value)} />
                                </div>
                            </div>

                            <Field>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            </Field>
                            <Field>
                                <Label htmlFor="desc">Notes</Label>
                                <Textarea id='desc' value={data.notes} placeholder="Remarks on Customer (optional)" className='resize-none' onChange={(e) => setData('notes', e.target.value)} />
                            </Field>

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
            title: 'Customers',
            href: customers.index().url
        },
    ],
};
