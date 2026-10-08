import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const fmt = (v: string | number) => `RM ${Number(v).toFixed(2)}`;
const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleString() : '-');
const label = (s: string) => s.replace(/_/g, ' ');

function Row({ k, v }: { k: string; v: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{k}</span>
            <span className="text-right font-medium">{v}</span>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-2">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="space-y-1.5 rounded-md border p-3">{children}</div>
        </section>
    );
}

export default function OrderDetailsDialog({ order, open, onOpenChange }: Props) {
    if (!order) return null;
    const { payment, shipment } = order;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        #ORD{order.id}
                        <Badge variant="secondary" className="capitalize">{label(order.status)}</Badge>
                    </DialogTitle>
                    <DialogDescription>
                        {order.customer.name} · {order.customer.phone} · {fmtDate(order.order_date)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <Section title="Items">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{item.product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.quantity} × {fmt(item.unit_price)}
                                    </p>
                                </div>
                                <span className="font-medium">{fmt(item.total_price)}</span>
                            </div>
                        ))}
                        <div className="mt-2 space-y-1 border-t pt-2">
                            <Row k="Subtotal" v={fmt(order.subtotal)} />
                            <Row k="Shipping" v={fmt(order.shipping_cost)} />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{fmt(order.total_amount)}</span>
                            </div>
                        </div>
                    </Section>

                    <Section title="Payment">
                        {payment ? (
                            <>
                                <Row k="Method" v={<span className="capitalize">{label(payment.payment_method)}</span>} />
                                <Row k="Amount" v={fmt(payment.amount)} />
                                <Row k="Status" v={<Badge variant="outline" className="capitalize">{payment.status}</Badge>} />
                                <Row k="Paid at" v={fmtDate(payment.paid_at)} />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">No payment recorded.</p>
                        )}
                    </Section>

                    <Section title="Shipment">
                        {shipment ? (
                            <>
                                <Row k="Courier" v={shipment.courier_name ?? '-'} />
                                <Row k="Tracking no." v={shipment.tracking_number ?? '-'} />
                                <div className="pt-1 text-sm">
                                    <p className="text-muted-foreground">Address</p>
                                    <p className="font-medium">{shipment.address}</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">No shipment recorded.</p>
                        )}
                    </Section>

                    {order.notes && (
                        <Section title="Notes">
                            <p className="text-sm">{order.notes}</p>
                        </Section>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}