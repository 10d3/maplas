import { auth } from '@/auth/auth';
import { Button } from '@/components/ui/button';
import { getOrdersByUser } from '@/lib/actions/orderAction';
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user;

  if(!user){
    throw new Error("You need to log first to see this page")
  }

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default ProfilePage