import {  LucideIcon } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card';

type Props = {
    title: string;
    icon : LucideIcon;
    value : string;
    change?: number | null;
}
export const SummaryCard = ({title,icon : Icon ,value,change}:Props) => {
  return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium font-lexend'>{title}</CardTitle>
            <Icon className='h-4 w-4 text-white'/>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold font-dm-sans">{value}</div>
            {change != null && (
                <p className={`text-sm font-medium font-lexend ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change >= 0 ? '+' : ''}{change}% from last month
                </p>
            )}
        </CardContent>
    </Card>
  )
}
