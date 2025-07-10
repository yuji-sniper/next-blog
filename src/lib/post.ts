import prisma from "@/lib/prisma"

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return posts
} 

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })

  return post
}

export async function searchPosts(query: string) {
  const decodedQuery = decodeURIComponent(query)
  const normalizedQuery = decodedQuery.replace(/[\s　]+/g, " ").trim()
  const words = normalizedQuery.split(" ").filter(Boolean)

  const filter = words.map((word) => ({
    OR: [
      { title: { contains: word } },
      { content: { contains: word } },
    ],
  }))

  const posts = await prisma.post.findMany({
    where: {
      AND: filter,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return posts
}
