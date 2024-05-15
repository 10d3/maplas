"use client"

import { PropsWithChildren, ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";


const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {


    return (<>
        <SessionProvider>
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </TooltipProvider>
        </SessionProvider>
    </>)
}

export default Providers