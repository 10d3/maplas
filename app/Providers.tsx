"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
    children: ReactNode
}

const Providers = (props: Props) => {

    const queryClient = new QueryClient();

    return (<>
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </SessionProvider>
    </>)
}

export default Providers