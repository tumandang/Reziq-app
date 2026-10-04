import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem , SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const page = usePage<SharedData>();
    useEffect(()=>{
        if(page.props.flash.message){
            toast.success(page.props.flash.message);
        }
        if(page.props.flash.error){
            toast.error(page.props.flash.error);
        }

    },[page.props.flash]);
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
            <Toaster richColors position='top-center'/>

        </AppLayoutTemplate>
    );
}
