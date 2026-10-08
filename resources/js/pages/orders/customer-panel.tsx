import { Customer } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronDown, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
    customers: Customer[];
    value: string;
    onChange: (id: string) => void;
}

export default function CustomerPanel({ customers, value, onChange }: Props) {
    if (customers.length === 0) {
        return (
            <div className="flex w-80 items-center justify-center border text-muted-foreground">
                <div className="flex items-center justify-between gap-x-4 px-4 py-3">
                    <span>No Customer Found.</span>
                    <Link href="/customers" className="flex justify-center rounded-xl border px-2 py-1 shadow">
                        <Plus className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    const selectedCust = customers.find(c => String(c.id) === value);

    return (
        <div className="flex w-80 flex-col border">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h1 className="text-muted-foreground">Customer</h1>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" type="button" className="w-full justify-between px-4 py-3 font-normal">
                        {selectedCust ? `${selectedCust.name} - ${selectedCust.phone}` : 'Choose a customer'}
                        <ChevronDown className="size-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Choose a customer</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                            {customers.map(c => (
                                <DropdownMenuRadioItem key={c.id} value={String(c.id)}>
                                    {c.name} - {c.phone}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}