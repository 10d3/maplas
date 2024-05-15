'use client'
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function AreaChartComponent({ data }: any) {
    return (
        <ResponsiveContainer width='100%' height='80%'>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray='2 2' stroke='#1e293b' vertical={false} />
                <Area dataKey='cashIn' type='monotone' fill={`url(#cyan-gradient)`} stroke='#06b6d4' />
                <XAxis dataKey='date'
                    fontSize={10} stroke='#334155'
                    tickLine={false} axisLine={false} interval={3}
                    tickFormatter={(value: string) => {
                        return value.split('-').reverse().slice(0, 2).join('/')
                    }}
                />
                <YAxis
                    dataKey='cashIn'
                    fontSize={10} stroke='#334155'
                    tickLine={false} axisLine={false} interval={1}
                    tickFormatter={(value) => {
                        return `$${Intl.NumberFormat('en-us').format(value)}`
                    }} />
                <defs>
                    <linearGradient id='cyan-gradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#06b6d4' stopOpacity={0.4} />
                        <stop offset='75%' stopColor='##d946ef' stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Tooltip
                    cursor={
                        {
                            fill: '#06b6d4',
                            radius: 4,
                            stroke: '#334155'
                        }
                    }
                    content={({ active, payload }) => {
                        if (!active || !payload || payload.length === 0) {
                            return null
                        }
                        return (
                            <div className=' rounded-lg border bg-slate-800 border-slate-700 p-2 shadow-sm'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='flex flex-col'>
                                        <span className='text-xm font-semibold uppercase text-slate-500'>Date</span>
                                        <span className='text-sm font-bold text-slate-300'>{payload[0].payload.date}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-xm font-semibold uppercase text-slate-500'>Cash In</span>
                                        <span className='text-sm font-bold text-slate-300'>
                                            ${Intl.NumberFormat('en-us').format(payload[0].payload.cashIn)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
