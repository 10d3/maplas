import TestSend from "@/components/test/testSend";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create  Event', href: '/event/create' },
        { name: "FAQ", href: "#" },
    ];

    return (
        <>
            <Separator className=" bg-slate-300" />
            <footer className="w-full flex items-center justify-center flex-col md:flex-row pb-8 gap-4">
                <div className="w-full md:w-1/3 items-center flex flex-col md:flex-row gap-4">
                    <div><Image className="w-[7rem] h-auto" src='/logo/logo-p.png' height={1000} width={1000} alt={`${SiteConfig.title} logo`} /></div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-xl font-medium">Subcribe to our newsletter</h1>
                        <Button className=" bg-custom-button-primary">Subcribe</Button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 items-center flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4 items-center flex flex-col">
                        <h1 className="text-xl font-medium">Quick link</h1>
                        <div className="flex flex-col items-center justify-center gap-2">
                            {links.map((link, i) => {
                                return (
                                    <Link className='' key={i} href={link.href}>{link.name}</Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                        <h1>Quick link</h1>
                        <div>link</div>
                        <TestSend />
                    </div>
                    <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                        <h1>Quick link</h1>
                        <div>link</div>
                    </div>
                    <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                        <h1>Quick link</h1>
                        <div>link</div>
                    </div>
                </div>
            </footer>
        </>
    )
}
