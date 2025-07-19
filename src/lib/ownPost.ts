import prisma from "./prisma";


export async function getOwnPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
}

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      AND: [
        { id: postId },
        { authorId: userId },
      ],
    },
    include: {
      author: true,
    },
  });
}
