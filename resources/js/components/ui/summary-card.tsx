import {  LucideIcon } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card';

type Props = {
    title: string;
    icon : LucideIcon;
    value : string;
}
export const SummaryCard = ({title,icon : Icon ,value}:Props) => {
  return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{title}</CardTitle>
            <Icon className='h-4 w-4 text-white'/>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className='text-sm font-bold'>+201% from last month</p>
        </CardContent>
    </Card>
  )
}
