import TestSend from "@/components/test/testSend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SiteConfig } from "@/lib/site-config";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create  Event', href: '/event/create' },
        { name: 'Blog', href: '/blog' },
        { name: "FAQ", href: "#" },
    ];

    const icons = [
        { name: <Facebook size={26} />, href: 'https://www.facebook.com/' },
        { name: <Instagram size={26} />, href: 'https://www.instagram.com/' },
        { name: <Twitter size={26} />, href: 'https://twitter.com/' },
    ]

    return (
        <>
            <Separator className=" bg-slate-300" />
            <footer className=" text-white w-full flex items-center space-x-4 justify-center flex-col py-6 sm:space-x-0 gap-4 bg-custom-destructive">
                <div className="w-full flex items-center justify-center flex-col md:flex-row gap-4 md:px-4">
                    <div className="w-full md:w-1/3 items-center flex flex-col md:flex-row gap-4">
                        <Link href='/'>
                            <Image
                                className="w-[4rem] md:w-[8rem] h-auto"
                                src='/logo/logo-p.png' height={1000} width={1000}
                                alt={`${SiteConfig.title} logo`}
                            />
                        </Link>
                        <div className="w-full flex flex-col items-center justify-center gap-4">
                            <h1 className="text-xl font-medium">Subcribe to our newsletter</h1>
                            <div className=" w-3/4 flex flex-col gap-2 items-center">
                                <Input className="w-full bg-white" type="email" placeholder="email" />
                                <Button className=" w-2/4 bg-custom-button-secondary">Subcribe</Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 items-center flex flex-row gap-4">
                        <div className="w-full md:w-1/3 items-center flex flex-col">
                            <h1 className="text-xl font-medium">Quick link</h1>
                            <div className="flex flex-col items-center justify-center gap-2">
                                {links.map((link, i) => {
                                    return (
                                        <Link className='' key={i} href={link.href}>{link.name}</Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 items-center flex flex-col gap-4">
                            <h1 className="text-xl font-medium">Quick link</h1>
                            <div>link</div>
                            <TestSend />
                        </div>
                        {/* <div className="w-full md:w-1/3 items-center flex flex-col gap-4">
                            <h1 className="text-xl font-medium">Quick link</h1>
                            <div>link</div>
                        </div> */}
                    </div>
                </div>
                <div className="w-full items-center flex flex-col gap-4">
                    <h1 className="text-xl font-medium">Follow Us</h1>
                    <div className="flex flex-row gap-4">
                        {
                            icons.map((icon, i) => {
                                return (<Link key={i} href={icon.href}>{icon.name}</Link>)
                            })
                        }
                    </div>
                </div>
            </footer>
        </>
    )
}
