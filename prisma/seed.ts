import { PrismaClient } from "../src/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()


async function main() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash("password1234", 12)

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: hashedPassword,
      name: "Test User",
      posts: {
        create: [
          {
            title: "Test Post",
            content: "This is a test post",
            topImage: "https://picsum.photos/id/1/600/400",
          },
          {
            title: "Test Post 2",
            content: "This is a test post 2",
            topImage: "https://picsum.photos/id/2/600/400",
          },
        ],
      },
    },
  })

  console.log(user)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
