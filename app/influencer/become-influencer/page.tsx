import OrganiInfluForm from '@/components/shared/OrganiInfluForm'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function page() {
    return (
        <section className='min-h-screen w-full flex items-center justify-center'>
            <Card className='my-24 flex flex-col gap-4 rounded-md max-w-lg p-12 bg-transparent backdrop-blur-lg bg-gradient-to-l from-violet-500/30 to-fuchsia-500/30'>
                <h1 className='text-xl self-center md:text-3xl font-medium'>
                    Become an Influencer
                </h1>
                <OrganiInfluForm />
            </Card>
        </section>
    )
}
