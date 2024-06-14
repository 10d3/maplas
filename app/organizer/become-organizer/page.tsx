import OrganiInfluForm from '@/components/shared/OrganiInfluForm'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function page() {
    return (
        <section className='min-h-screen w-full pt-12 flex items-center justify-center'>
            <Card className=' mt-24 h-auto flex flex-col gap-4 rounded-md max-w-lg p-12 bg-transparent backdrop-blur-lg bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30'>
                <h1 className='text-xl self-center md:text-3xl'>
                    Become an Organizer
                </h1>
                <OrganiInfluForm />
            </Card>
        </section>
    )
}
