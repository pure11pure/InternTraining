/**
 * [https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes]
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  requet: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    // include:{
    //   category: true
    // }
  });
  return Response.json(post);
}

export async function PUT(
  requet: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, categoryId } = await requet.json();
    const postId = Number(params.id);
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        categoryId: Number(categoryId),
      },
    });
    return Response.json(post);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  requet: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);
    const deletePost = await prisma.post.delete({
      where: { id: postId },
    });
    return Response.json(deletePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
