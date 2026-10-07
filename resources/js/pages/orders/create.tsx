import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CartItem, Customer, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { LayoutGrid, Search } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./product-grid";
import CartPanel from "./cart-panel";
import { useCart } from "./use-cart";
import orders from "@/routes/orders";
import CustomerPanel from "./customer-panel";

interface Props {
    products: Product[];
    customers: Customer[];
}
export default function Create({ products,customers }: Props) {
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    const {items,subtotal,addItem,removeItem,setQuantity,clear} = useCart();

    
    const [customerId, setCustomerId] = useState('');

    return (
        <>
            <Head title="Point of Sale" />
            <div className="flex h-screen flex-col">

                <div className="flex flex-1 overflow-hidden">
                    <ProductGrid products={filtered} onAdd={addItem}/>
                    <div className="flex flex-col ">
                        <CustomerPanel customers={customers} value={customerId} onChange={setCustomerId}/>
                        <CartPanel items ={items} subtotal= {subtotal} onRemove ={removeItem} onSetQuantity={setQuantity} onClear = {clear} />
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