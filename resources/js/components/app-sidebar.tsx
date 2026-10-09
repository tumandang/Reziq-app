import { Link } from '@inertiajs/react';
import { BookOpen, Boxes, ChartColumnBig, FolderGit2, LayoutGrid, PillBottle, ShoppingCart, Tags, Truck, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import products from '@/routes/products';
import customers from '@/routes/customers';
import orders from '@/routes/orders';
import inventory from '@/routes/inventory';

const mainNavItems: NavItem[] = [
    {
        title: 'Main',
        items: [
            {
                subtitle: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            }
        ],
    },
    {
        title: 'Inventory',
        items: [
            {
                subtitle: 'Product',
                href: products.index(),
                icon: PillBottle,
            },
            {
                subtitle: 'Stock Adjustment',
                href: inventory.index(),
                icon: Boxes
            }
        ]
    },
    {
        title: 'Bussiness',
        items: [
            {
                subtitle: 'Orders',
                href: orders.index(),
                icon: ShoppingCart,
            },
            {
                subtitle: 'Customers',
                href: customers.index(),
                icon: Users,
            }
        ]

    },
  

];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        items: [
            {
                subtitle: 'Repository',
                href: 'https://github.com/tumandang/Reziq-app.git',
                icon: FolderGit2,
            },
            {
                subtitle: 'Documentation',
                href: 'https://laravel.com/docs/starter-kits#react',
                icon: BookOpen,
            },
        ]
    }

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
