import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Trash } from "lucide-react";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup,
    DropdownMenuRadioItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

interface CartItem {
    product: { id: number; name: string; price: string };
    quantity: number;
}

export interface CheckoutDetails {
    payment_method: string;
    address: string;
    shipping_cost: string;
    courier_name: string;
    tracking_number: string;
}

interface Props {
    items: CartItem[];
    subtotal: number;
    canCheckout: boolean;
    customerAddress: string;
    onRemove: (productId: number) => void;
    onSetQuantity: (productId: number, qty: number) => void;
    onClear: () => void;
    onCheckout: (details: CheckoutDetails, onSuccess: () => void) => void;
}

const PAYMENT_METHODS = [
    { value: 'online_banking', label: 'Online Banking' },
    { value: 'QR_Code', label: 'QR Code' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cod', label: 'Cash on Delivery' },
];

const emptyDetails: CheckoutDetails = {
    payment_method: 'online_banking',
    address: '',
    shipping_cost: '',
    courier_name: '',
    tracking_number: '',
};

export default function CartPanel({
    items, subtotal, canCheckout, onRemove, onSetQuantity, onClear, onCheckout, customerAddress
}: Props) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
    const [addressMode, setAddressMode] = useState<'customer' | 'new'>('new');
    const set = (key: keyof CheckoutDetails, value: string) =>
        setDetails(d => ({ ...d, [key]: value }));

    const paymentLabel = PAYMENT_METHODS.find(m => m.value === details.payment_method)?.label;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const address = addressMode === 'customer' ? customerAddress : details.address;

        onCheckout({ ...details, address }, () => {
            setOpen(false);
            setDetails(emptyDetails);
        });
    };

    return (
        <div className="flex w-80 flex-1 flex-col border">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="font-semibold">Cart</h2>
                {items.length > 0 && (
                    <button onClick={onClear} className="text-xs text-muted-foreground hover:text-destructive">
                        Clear All
                    </button>
                )}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {items.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">No Items yet</p>
                ) : (
                    items.map(item => (
                        <div key={item.product.id} className="flex items-center gap-2">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{item.product.name}</p>
                                <p className="text-xs text-muted-foreground">RM{item.product.price} each</p>
                            </div>
                            <Input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={e => onSetQuantity(item.product.id, parseInt(e.target.value) || 0)}
                                className="w-16 text-center"
                            />
                            <Button onClick={() => onRemove(item.product.id)}>
                                <Trash className="h-4 w-4 text-destructive" />
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
                {!canCheckout && items.length > 0 && (
                    <p className="text-xs text-muted-foreground">Select a customer to continue.</p>
                )}
                <Button
                    className="w-full"
                    size="lg"
                    disabled={items.length === 0 || !canCheckout}
                    onClick={() => {
                        setAddressMode(customerAddress ? 'customer' : 'new');
                        setOpen(true);
                    }}

                >
                    Create Sales
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Payment & Shipment</DialogTitle>
                        <DialogDescription>Fill in the payment and shipment details.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className="my-5">
                            <Field>
                                <Label>Payment Method</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" type="button" className="w-full justify-between font-normal">
                                            {paymentLabel}
                                            <ChevronDown className="size-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                                        <DropdownMenuRadioGroup
                                            value={details.payment_method}
                                            onValueChange={v => set('payment_method', v)}
                                        >
                                            {PAYMENT_METHODS.map(m => (
                                                <DropdownMenuRadioItem key={m.value} value={m.value}>
                                                    {m.label}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </Field>

                            <Field>
                                <Label>Address</Label>

                                {customerAddress && (
                                    <div className="flex gap-2">
                                        <Button type="button" size="sm"
                                            variant={addressMode === 'customer' ? 'default' : 'outline'}
                                            onClick={() => setAddressMode('customer')}>
                                            Customer address
                                        </Button>
                                        <Button type="button" size="sm"
                                            variant={addressMode === 'new' ? 'default' : 'outline'}
                                            onClick={() => setAddressMode('new')}>
                                            New address
                                        </Button>
                                    </div>
                                )}

                                {addressMode === 'customer' && customerAddress ? (
                                    <p className="rounded-md border p-3 text-sm text-muted-foreground">
                                        {customerAddress}
                                    </p>
                                ) : (
                                    <Input
                                        id="address"
                                        required
                                        placeholder="Enter delivery address"
                                        value={details.address}
                                        onChange={e => set('address', e.target.value)}
                                    />
                                )}
                            </Field>

                            <div className="flex gap-3">
                                <div className="grid flex-1 gap-3">
                                    <Label htmlFor="courier_name">Courier</Label>
                                    <Input id="courier_name" value={details.courier_name}
                                        onChange={e => set('courier_name', e.target.value)} />
                                </div>
                                <div className="grid flex-1 gap-3">
                                    <Label htmlFor="shipping_cost">Shipping Cost</Label>
                                    <Input id="shipping_cost" type="number" min={0} step="0.01"
                                        value={details.shipping_cost}
                                        onChange={e => set('shipping_cost', e.target.value)} />
                                </div>
                            </div>

                            <Field>
                                <Label htmlFor="tracking_number">Tracking Number</Label>
                                <Input id="tracking_number" value={details.tracking_number}
                                    onChange={e => set('tracking_number', e.target.value)} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}