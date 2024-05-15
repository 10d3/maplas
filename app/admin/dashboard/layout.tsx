
import SideBar from '@/components/shared/sidebar';
import { SiteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: SiteConfig.title,
    description: SiteConfig.description,
};

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="relative w-full flex min-h-screen flex-row px-5 mt-6">
                <SideBar />
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
}
