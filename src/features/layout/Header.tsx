import { Menu, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { LoggedInButton } from "../auth/LoggedInButton"
import Link from 'next/link';


export default async function Header() {

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create', href: '/create-event' },
        { name: "FAQ", href: "#" },
    ];


    return (
        <header>
            <div className="container flex h-16 items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-2 items-center ">
                    {/* <Image src="/images/logo.svg" width={50} height={35} alt="app logo" /> */}
                    <h1>La Vache</h1>
                </div>
                {/* menu pc */}

                <div className=' hidden md:flex gap-2 items-center '>
                    {links.map((link, i) => {
                        return (
                            <Link className='' key={i} href={link.href}>{link.name}</Link>
                        );
                    })}
                </div>

                <div className=" hidden md:flex items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <LoggedInButton />
                    </nav>
                </div>

                <div className='flex md:hidden'>
                    <Drawer direction='left'>
                        <DrawerTrigger>
                            <Menu />
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
                                                <Link className='' key={i} href={link.href}>{link.name}</Link>
                                            </DrawerClose>
                                        );
                                    })}
                                </div>
                                <div className='flex flex-col w-full items-center'>
                                    <div className='flex flex-col gap-4 p-3 items-center'>
                                        <LoggedInButton />
                                    </div>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>

                </div>

            </div>
        </header>
    )
}
