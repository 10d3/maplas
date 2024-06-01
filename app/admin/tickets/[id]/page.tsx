import { auth } from '@/auth/auth';
import Ticket from '@/components/shared/Ticket';
import { prisma } from '@/db/prisma';

interface UpdateEventProps {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: UpdateEventProps) {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  const event = await prisma.event.findUnique({
    where: { id: ticket?.eventId },
    include: { createdBy: true },
  });
  const session = await auth();

  if (!ticket || !event || !session) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Ticket ticket={ticket} event={event} session={session} />
    </>
  );
}
