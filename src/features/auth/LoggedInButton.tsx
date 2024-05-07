import { auth } from '@/auth/auth'
import React from 'react'
import SignInButton from './SignInButton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SignOutButton } from './SignOutButton'
import { LoginButton } from './LogInButton'

export const LoggedInButton = async () => {

    const user = await auth()

    if (!user) {
        return <SignInButton />
    }
    return (
        <SignOutButton>
            <Button variant='outline' size='sm' className='p-2'>
                <Avatar className='size-8'>
                    <AvatarFallback>
                        {user.user?.name?.[0]}
                    </AvatarFallback>
                    {user.user?.image ? (<AvatarImage src={user.user.image} alt={`${user.user.name ?? '-'}'s profile pic`} />) : null}
                </Avatar>
            </Button>
        </SignOutButton>
    )
}
