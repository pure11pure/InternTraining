import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function GET() {
    const posts = await prisma.post.findMany()
    return Response.json({
        posts
    })
}

export async function POST(requet: Request) {

    try {
        const { title, content } = await requet.json()
        const newPost = await prisma.post.create({
            data: {
                title,
                content
            }
        })
        return Response.json({
            newPost
        })
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500
        })  
    }

}