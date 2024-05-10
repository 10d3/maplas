"use client"

import { PropsWithChildren, ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {


    return (<>
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    </>)
}

export default Providers