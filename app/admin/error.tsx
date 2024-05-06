
'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginButton } from '@/features/auth/LogInButton'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex justify-center items-center mx-6 md:mx-24 h-dvh'>
            <Card className='m-auto max-w-lg mt-4 md:w-[450px]'>
                <CardHeader className='flex flex-row gap-4'>
                    <CardTitle>
                        You need to logged in to view this page
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <LoginButton />
                </CardFooter>
            </Card>
        </div>
    )
}