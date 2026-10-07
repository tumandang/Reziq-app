import { Customer } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { ChevronDown, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import customers from "@/routes/customers";
export interface CustomerList {
    customer: Customer
}
interface Props {
    customers: Customer[];
    value: string;
    onChange: (id: string) => void;
}
const emptyForm = { customer_id: '' };

export default function CustomerPanel({ customers, value, onChange }: Props) {
    const { data, setData } = useForm(emptyForm);
    if (customers.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center text-muted-foreground gap-x-4">
                <span>No Customer Found.</span>
                <Link href='/customers' className="p-2 rounded-2xl bg-white"><Plus /></Link>
            </div>
        )
    }
    const selectedCust = customers.find((p) => String(p.id) === String(data.customer_id));
    return (
        <div className="flex w-80 flex-col border">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h1 className="text-muted-foreground">Customer</h1>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" type="button" className="w-full justify-between font-normal px-4 py-3">
                        {selectedCust ? `${selectedCust.name} - ${selectedCust.phone}` : 'Choose a Customers'}
                        <ChevronDown className="size-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel >Choose a Customer
                        </DropdownMenuLabel>
                        {customers.length === 0 ? (
                            <div className="px-2 py-1.5 text-sm text-gray-400">Add Customer first</div>
                        ) : (
                            <DropdownMenuRadioGroup
                                value={String(data.customer_id)}
                                onValueChange={(value) => setData('customer_id', value)}
                            >
                                {customers.map((p) => (
                                    <DropdownMenuRadioItem key={p.id} value={String(p.id)}>
                                        {p.name}-{p.phone}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        )}

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}