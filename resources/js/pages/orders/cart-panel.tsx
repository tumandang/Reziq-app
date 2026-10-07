import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

interface CartItem{
    product: {id:number,name:string,price:string};
    quantity: number;
}

interface Props{
    items: CartItem[];
    subtotal: number;
    onRemove: (productId:number)=>void;
    onSetQuantity: (productID:number, qty:number)=>void;
    onClear:() =>void;
}


export default function CartPanel({items,subtotal,onRemove,onSetQuantity,onClear}:Props){
    return(
        <div className="flex w-80 flex-col border-1">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="font-semibold">Cart</h2>
                {items.length > 0 && (
                    <button onClick={onClear} className="text-xs text-muted-foreground hover:text-destructive">Clear All</button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ?(
                    <p className="text-sm text-muted-foreground text-center py-8">No Items yet</p>
                ):(
                    items.map(item =>(
                        <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.product.name}</p>
                                <p className="text-xs text-muted-foreground">RM{item.product.price} each</p>
                            </div>
                            <Input
                                type="number"
                                min={1}
                                max= {item.quantity}
                                onChange={e =>onSetQuantity(item.product.id , parseInt(e.target.value) || 0)}
                                className="w-16 text-center"
                            />
                            <Button onClick={ () => onRemove(item.product.id)}>
                                <Trash className="w-4 h-4 text-destructive"/>
                            </Button>
                        </div>
                    ))
                )}
            </div>
            <div className="space-y-3 border-t p-4">
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <Button
                    className="w-full"
                    size={"lg"}
                    disabled={items.length === 0}
                    
                >Create Sales</Button>
            </div>
        </div>
    )
}