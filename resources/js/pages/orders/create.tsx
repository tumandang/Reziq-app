import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Customer = { id: number; name: string; phone: string | null };
type Product = { id: number; name: string; price: string; stock: number | null };
type Row = { product_id: string; quantity: number };

export default function Create({ customers, products }: { customers: Customer[]; products: Product[] }) {
    const { data, setData, post, processing, errors } = useForm<{
        customer_id: string;
        notes: string;
        items: Row[];
    }>({
        customer_id: '',
        notes: '',
        items: [{ product_id: '', quantity: 1 }],
    });

    const err = errors as Record<string, string>;
    const findProduct = (id: string) => products.find((p) => String(p.id) === id);

    const updateRow = (index: number, patch: Partial<Row>) =>
        setData(
            'items',
            data.items.map((r, i) => (i === index ? { ...r, ...patch } : r)),
        );

    const addRow = () => setData('items', [...data.items, { product_id: '', quantity: 1 }]);

    const removeRow = (index: number) =>
        setData(
            'items',
            data.items.filter((_, i) => i !== index),
        );

    const total = data.items.reduce((sum, r) => {
        const p = findProduct(r.product_id);
        return p ? sum + Number(p.price) * (Number(r.quantity) || 0) : sum;
    }, 0);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/orders');
    };

    if (products.length === 0 || customers.length === 0) {
        return (
            <>
                <Head title="New order" />
                <div className="p-6">
                    <p className="mb-3">
                        {products.length === 0 ? 'Add a product first.' : 'Add a customer first.'}
                    </p>
                    <Link
                        href={products.length === 0 ? '/products/create' : '/customers'}
                        className="rounded bg-black px-3 py-2 text-sm text-white"
                    >
                        {products.length === 0 ? 'Add product' : 'Go to customers'}
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="New order" />
            <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5 p-6">
                <h1 className="text-xl font-semibold">New order</h1>

                <div>
                    <label className="mb-1 block text-sm font-medium">Customer</label>
                    <select
                        value={data.customer_id}
                        onChange={(e) => setData('customer_id', e.target.value)}
                        className="w-full rounded border bg-background px-3 py-2"
                    >
                        <option value="">Select customer</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name} {c.phone ? `(${c.phone})` : ''}
                            </option>
                        ))}
                    </select>
                    {err.customer_id && <p className="mt-1 text-xs text-red-600">{err.customer_id}</p>}
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium">Items</label>

                    {data.items.map((row, i) => {
                        const p = findProduct(row.product_id);
                        const qty = Number(row.quantity) || 0;
                        const tracked = p && p.stock !== null;
                        const short = tracked && qty > (p!.stock as number);

                        return (
                            <div key={i} className="rounded border p-3">
                                <div className="flex items-center gap-3">
                                    <select
                                        value={row.product_id}
                                        onChange={(e) => updateRow(i, { product_id: e.target.value })}
                                        className="flex-1 rounded border bg-background px-3 py-2"
                                    >
                                        <option value="">Select product</option>
                                        {products.map((pr) => (
                                            <option key={pr.id} value={pr.id}>
                                                {pr.name} - RM {pr.price}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        min={1}
                                        value={row.quantity}
                                        onChange={(e) => updateRow(i, { quantity: Number(e.target.value) })}
                                        className="w-20 rounded border bg-background px-3 py-2"
                                    />

                                    <span className="w-24 text-right text-sm">
                                        RM {p ? (Number(p.price) * qty).toFixed(2) : '0.00'}
                                    </span>

                                    {data.items.length > 1 && (
                                        <button type="button" onClick={() => removeRow(i)} className="text-red-600">
                                            Remove
                                        </button>
                                    )}
                                </div>

                                {short && (
                                    <p className="mt-2 text-sm text-amber-600">
                                        Insufficient stock. Available: {p!.stock}, Required: {qty}, Shortage:{' '}
                                        {qty - (p!.stock as number)}
                                    </p>
                                )}
                                {err[`items.${i}.product_id`] && (
                                    <p className="mt-1 text-xs text-red-600">{err[`items.${i}.product_id`]}</p>
                                )}
                                {err[`items.${i}.quantity`] && (
                                    <p className="mt-1 text-xs text-red-600">{err[`items.${i}.quantity`]}</p>
                                )}
                            </div>
                        );
                    })}

                    {err.items && <p className="text-xs text-red-600">{err.items}</p>}

                    <button type="button" onClick={addRow} className="text-sm underline">
                        + Add another product
                    </button>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Notes (optional)</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className="w-full rounded border bg-background px-3 py-2"
                    />
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-semibold">Total: RM {total.toFixed(2)}</p>
                    <div className="flex gap-3">
                        <button disabled={processing} className="rounded bg-black px-4 py-2 text-white">
                            Save order
                        </button>
                        <Link href="/orders" className="px-4 py-2 underline">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Orders', href: '/orders' },
        { title: 'New order', href: '/orders/create' },
    ],
};