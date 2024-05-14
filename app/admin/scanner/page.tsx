
import ScannerApp from '@/components/shared/scanner'
import { prisma } from '@/db/prisma'

export default async function page() {
  const tickets = await prisma.ticket.findMany({include:{buyer:true}})
  console.log(tickets)
  return (
    <div className='w-full h-auto flex items-center justify-center'><ScannerApp tickets={tickets} /></div>
  )
}
