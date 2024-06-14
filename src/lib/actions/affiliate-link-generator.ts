import { prisma } from "@/db/prisma";

export const affiliateLinkGenerator = async (
  influencerId: string,
  eventId: string
) => {
  const link = `${window.location.origin}/${influencerId}&${eventId}`
  try {
    const result = await prisma.affiliate.create({
        data: {
          affiliateId: influencerId,
          influencer: {
            connect: {
              id: influencerId,
            },
          },
          event: {
            connect: {
              id: eventId,
            },
          },
        },
      });
      return {props:{link, result}}
  } catch (error) {
    return error
  }
};
