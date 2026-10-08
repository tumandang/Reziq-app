import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CartItem, Customer, Product } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import ProductGrid from "./product-grid";
import { useCart } from "./use-cart";
import orders from "@/routes/orders";
import CartPanel, { CheckoutDetails } from "./cart-panel";
import CustomerPanel from "./customer-panel";

interface Props {
    products: Product[];
    customers: Customer[];
}
export default function Create({ products, customers }: Props) {
    const [search, setSearch] = useState('');
     const [customerId, setCustomerId] = useState('');
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    const selectedCustomer = customers.find(c => String(c.id) === customerId);
    const { items, subtotal, addItem, removeItem, setQuantity, clear } = useCart();

    const handleCheckout = (details: CheckoutDetails, onSuccess: () => void) => {
        router.post(orders.store().url, {
            customer_id: customerId,
            ...details,
            items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity })),
        }, {
            onSuccess: () => {
                clear();
                onSuccess();
            },
        });
    };
   

    return (
        <>
            <Head title="Point of Sale" />
            <div className="flex h-screen flex-col">

                <div className="flex flex-1 overflow-hidden">
                    <ProductGrid products={filtered} onAdd={addItem} />
                    <div className="flex flex-col ">
                        <CustomerPanel customers={customers}
                            value={customerId}
                            onChange={setCustomerId} />
                        <CartPanel
                            items={items}
                            subtotal={subtotal}
                            canCheckout={customerId !== ''}
                            onRemove={removeItem}
                            onSetQuantity={setQuantity}
                            onClear={clear}
                            onCheckout={handleCheckout}
                            customerAddress={selectedCustomer?.address ?? ''}
                        />
                    </div>

                </div>

            </div>

        </>
    )

}
Create.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: orders.index().url,
        },
        {
            title: 'Point of Sale',
            href: orders.create().url,
        }
    ],
};