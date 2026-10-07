import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CartItem, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { LayoutGrid, Search } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./product-grid";
import CartPanel from "./cart-panel";
import { useCart } from "./use-cart";

interface Props {
    products: Product[];
}
export default function Create({ products }: Props) {
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    const {items,subtotal,addItem,removeItem,setQuantity,clear} = useCart();

    

    return (
        <>
            <Head title="Point of Sale" />
            <div className="flex h-screen flex-col">
                <div className="flex items-center gap-4 border-b px-4 py-3">
                    <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <LayoutGrid className="h-5 w-5" />
                    </Link>
                    <span className="font-semibold">Point of Sale</span>
                    <div className="relative ml-4 flex-1 max-w-sm">
                        <InputGroup className="flex-1">
                            <InputGroupInput placeholder="Search Orders..." value={search} onChange={e => setSearch(e.target.value)}/>
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>

                        </InputGroup>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <ProductGrid products={filtered} onAdd={addItem}/>
                    <CartPanel items ={items} subtotal= {subtotal} onRemove ={removeItem} onSetQuantity={setQuantity} onClear = {clear} />
                </div>

            </div>

        </>
    )

}