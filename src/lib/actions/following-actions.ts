import { prisma } from "@/db/prisma";

export async function followUser(followerId: string, followingId: string) {
  try {
    // Check if the followerId and followingId are the same
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself.");
    }

    // Check if the follower relationship already exists
    const existingFollower = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollower) {
      throw new Error("You are already following this user.");
    }

    // Create a new follower relationship
    const newFollower = await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });

    return newFollower;
  } catch (error) {
    throw new Error(`Failed to follow user: ${error}`);
  }
}
