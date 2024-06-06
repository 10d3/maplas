import { Menu, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { LoggedInButton } from "../auth/LoggedInButton"
import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';


export default async function Header() {

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create  Event', href: '/event/create' },
        { name: 'Blog', href: '/blog' },
        { name: "FAQ", href: "#" },
    ];

    const linksPc = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Blog', href: '/blog' },
        { name: "FAQ", href: "#" },
    ];

    return (
        <header className=' bg-transparent absolute top-0 w-full h-auto z-50'>
            <div className="container text-white flex h-16 items-center justify-between my-0 py-0 space-x-4 sm:justify-between sm:space-x-0">
                {/*menu mobile*/}

                <div className='flex md:hidden justify-between w-full'>
                    <div className=' flex md:hidden'>
                        <Drawer direction='left'>
                            <DrawerTrigger>
                                <Menu />
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className='flex flex-col h-[85%] w-full justify-center items-center'>
                                    <div className='flex flex-col items-center gap-4'>
                                        {links.map((link, i) => {
                                            return (
                                                <DrawerClose key={i} asChild>
                                                    <Link className='text-white' key={i} href={link.href}>{link.name}</Link>
                                                </DrawerClose>
                                            );
                                        })}
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>

                    </div>
                    <div className=" flex gap-2 items-center ">
                        {/* <Image src="/images/logo.svg" width={50} height={35} alt="app logo" /> */}
                        <Link href='/'>
                            <Image className=' w-auto h-6' src='/logo/logo-primary.png' height={1000} width={1000} alt={`${SiteConfig.title} logo`} />
                        </Link>
                    </div>

                    <div className='flex md:hidden flex-col w-auto items-center'>
                        <LoggedInButton />
                    </div>
                </div>
                {/*end menu mobile*/}

                {/* menu pc */}

                <div className='text-white hidden md:flex gap-6 items-center '>
                    {linksPc.map((link, i) => {
                        return (
                            <Link className='' key={i} href={link.href}>{link.name}</Link>
                        );
                    })}
                </div>

                <div className=" hidden md:flex gap-2 items-center ">
                    <Link href='/'>
                        <Image className=' w-auto h-9' src='/logo/logo-primary.png' height={1000} width={1000} alt={`${SiteConfig.title} logo`} />
                    </Link>
                </div>

                <div className=" hidden md:flex items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1 gap-4">
                        <Link href='/event/create' className={buttonVariants({variant:'default', size:'sm'})}>Create Event</Link>
                        <LoggedInButton />
                    </nav>
                </div>

            </div>
            {/* <Separator className='w-full' /> */}
        </header>
    )
}
