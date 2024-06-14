'use client'
import React from 'react'
import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { LayoutDashboard, Package, Package2, ShoppingCart, Users2, X } from 'lucide-react';

import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@/features/auth/SignOutButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function SideBar() {

    const pathname = usePathname()

    const links = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={16} /> },
        { name: "Orders", href: "/admin/dashboard/orders", icon: <ShoppingCart size={16} /> },
        { name: 'Event', href: '/admin/create-event', icon: <Package size={16} /> },
        { name: "Affiliation", href: "/admin/dashboard/affiliation", icon: <Users2 size={16} /> },
    ];
    return (
        <aside className="absolute md:w-[10%] md:flex h-4/5">

            <div className=' hidden md:flex flex-col justify-between'>
                {/* <div>
                    <h1>Logo</h1>
                </div> */}
                {/* menu pc */}

                <div className=' hidden md:flex flex-col gap-2 items-center '>
                    {links.map((link, i) => {
                        return (
                            <Tooltip key={i} >
                                <TooltipTrigger asChild>
                                    <Link className='' key={i} href={link.href}>
                                        <Button variant={link.href === pathname ? "default" : "ghost"}>
                                            {link.icon}
                                        </Button>
                                        <span className="sr-only">
                                            {link.name}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{link.name}</TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
                <div>
                    <SignOutButton />
                </div>
            </div>


            {/* end menu pc */}


            <div className='absolute md:hidden'>
                <Drawer direction='left'>
                    <DrawerTrigger>
                        <Package2 />
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className='flex flex-col h-[85%] w-full justify-between'>
                            <div className='flex self-end'>
                                <DrawerTitle>
                                    <DrawerClose asChild>
                                        <X />
                                    </DrawerClose>
                                </DrawerTitle>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                {links.map((link, i) => {
                                    return (
                                        <DrawerClose key={i} asChild>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link className='' key={i} href={link.href}><Button className='flex flex-row gap-2' variant={link.href === pathname ? "default" : "ghost"}>{link.icon} {link.name}</Button><span className="sr-only">{link.name}</span></Link>
                                                </TooltipTrigger>
                                                <TooltipContent side="right">{link.name}</TooltipContent>
                                            </Tooltip>
                                        </DrawerClose>
                                    );
                                })}
                            </div>
                            <div className='flex flex-col w-full items-center'>
                                <div className='flex flex-col gap-4 p-3 items-center'>
                                    <SignOutButton />
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>

            </div>
        </aside>
    )
}
