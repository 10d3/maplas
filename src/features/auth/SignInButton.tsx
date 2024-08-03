import { signIn } from '@/auth/auth';
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react';
import React from 'react'

export default function SignInButton() {
  return (
    <form>
        <Button className='text-white bg-custom-secondary' variant="secondary" size='sm' formAction={async () =>{
            "use server"
            await signIn();
        }}>
          <LogIn size={15} className='mr-2'/>
        Log In
    </Button>
    </form>
  )
}
