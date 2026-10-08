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

export interface Payment {
    amount: string;
    payment_method: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paid_at: string | null;
}

export interface Shipment {
    courier_name: string | null;
    tracking_number: string | null;
    address: string;
    status: 'pending' | 'shipped' | 'delivered' | 'returned';
    shipped_at: string | null;
    delivered_at: string | null;
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
    order_date: string;
    items_count?: number;
    customer: {
        id: number;
        name: string;
        phone: string | null;
        address: string
    };
    items: OrderItem[];
    payment: Payment | null;
    shipment: Shipment | null;
}

export interface Shipment {
    id:number;
}

export interface CartItem {
    product: Product,
    quantity: number
}