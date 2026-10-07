import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { Plus } from "lucide-react";

export interface CartItem {
    product: Product,
    quantity: number
}
interface Props {
    products: Product[];
    onAdd: (product: Product) => void;
}

export default function ProductGrid({ products, onAdd }: Props) {
    if (products.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
                No Products Found.
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {products.map(product => {
                    const active = Number(product.isactive) === 1 || product.isactive === true;

                    return (
                        <Card key={product.id} className="group w-full gap-0 overflow-hidden pt-0 transition-shadow hover:shadow-md">
                            <div className="relative flex aspect-square w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40">
                                <span className="text-4xl font-semibold uppercase tracking-wide text-muted-foreground/70">
                                    {product.name.substring(0, 2)}
                                </span>
                            </div>

                            <CardHeader className="gap-1 pt-4">
                                <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                                <p className="text-lg font-semibold">
                                    RM{Number(product.price).toFixed(2)}
                                </p>
                                <p className="text-white">Stock: {product.stock} </p>
                            </CardHeader>

                            <CardFooter className="pt-4">
                                <Button
                                    className="w-full"
                                    disabled={!product.is_active}
                                    onClick={() => onAdd(product)}
                                >
                                    <Plus className="mr-1 size-4" />
                                    Add to Order
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}