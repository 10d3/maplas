'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Pagination({ totalPage, currentPage, filterValues: { q, eventtype, location, page } }: any) {
    function generatePageLink(page: number) {
        const searParams = new URLSearchParams({
            ...(q && { q: q.trim() }),
            ...(eventtype && { eventtype: eventtype }),
            ...(location && { location: location }),
            page: page.toString()
        })
        return `/event/?${searParams.toString()}`
    }
    return (
        <div className='flex flex-row gap-2'>
            <Link href={generatePageLink(currentPage - 1)}
                className={cn("flex items-center font-semibold",
                    currentPage <= 1 && 'invisible')}>
                <Button className=' bg-custom-button-primary text-white flex gap-2 items-center justify-center' size='lg' variant='outline'>
                    <ArrowLeft size={15} />Prev
                </Button>
            </Link>
            <Link href={generatePageLink(currentPage + 1)}
                className={cn("flex items-center font-semibold",
                    currentPage >= totalPage && 'invisible')}>
                <Button className=' bg-custom-button-primary text-white flex gap-2 items-center justify-center' size='lg' variant='outline'>
                    Next<ArrowRight size={15} />
                </Button>
            </Link>
        </div>
    )
}
