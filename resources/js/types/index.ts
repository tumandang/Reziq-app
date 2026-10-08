import { User } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface SharedData {
    name: string;
    auth: { user: User | null };
    flash: {message?:string ; error?:string};
    [key: string]: unknown;
}
export interface Product{
    [x: string]: any;
    id:number;
    name:string;
    price:string;
    low_stock_threshold:number;
    isactive: boolean;
    stock:number;
}
export interface Inventory{
    [x: string]: any;
    id:number;
    product_id:number;
    adjustment_type:string;
    reason:string;
    quantity:number;
    created_at:string;
}
export interface Customer{
    [x: string]: any;
    id:number;
    name:string;
    phone:string;
    address:string | null;
    notes:string;
}
export interface OrderItem {
    [x: string]: any;
    id: number;
    quantity: number;
    unit_price: string;
    product: {
        id: number;
        name: string;
        stock_quantity: number | null;
    };
}

export interface Order {
    [x: string]: any;
    id: number;
    status: 'pending' | 'awaiting_stock' | 'processing' | 'completed' | 'cancelled';
    subtotal: string;
    shipping_cost: string;
    total_amount: string;
    notes: string | null;
    created_at: string;
    items_count?: number;
    customer: {
        id: number;
        name: string;
        phone: string | null;
    };
    items?: OrderItem[];
}

export interface CartItem {
    product: Product,
    quantity: number
}