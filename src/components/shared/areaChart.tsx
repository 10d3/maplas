'use client'
import React from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts'

export default function AreaChartComponent({ data }: any) {
    console.log("je monte")
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
                <Area dataKey='cashIn' type='monotone' stroke='#06b6d4' />
                <XAxis dataKey='date' stroke='#334155' />
                <defs>
                    <linearGradient id='cyan-gradient' x1='0' y1='0' x2='' y2='1'>
                        <stop offset='0%' stopColor='#06b6d4' stopOpacity={0.4}/>
                        <stop offset='75%' stopColor='##d946ef' stopOpacity={0.05}/>
                    </linearGradient>
                </defs>
            </AreaChart>
        </ResponsiveContainer>
    )
}
