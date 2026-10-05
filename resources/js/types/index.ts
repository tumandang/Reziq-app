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
    desc:string;
    cost:number;
    price:number;
    stock:number;
    low_stock_threshold:number;
}
export interface Customer{
    [x: string]: any;
    id:number;
    name:string;
    phone:string;
    address:string;
    notes:string;
}