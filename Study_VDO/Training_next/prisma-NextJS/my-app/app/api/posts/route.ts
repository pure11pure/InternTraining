// [https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries]

import { type NextRequest } from "next/server"; // รับ req จาก url

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category"); //ไม่ส่งก็ไม่ใช้
  const search = searchParams.get("search") || ""; //ไม่ส่งยังไงก็ ""
  const sort = searchParams.get("sort") || "desc"; //ไม่ส่งก็จะส่ง desc

  const whereCondition = category
    ? {
        // การค้นหาใน table ที่ต่างกัน
        category: {
          is: {
            name: category,
          },
        },
        title: {
          contains: search,
          mode: "insensitive", //จะพิมพ์เล็กพิมพ์ใหญ่ก็หาได้เหมือนกัน
        },
      }
    : {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };

  try {
    const posts = await prisma.post.findMany({
      where: whereCondition as any,
      orderBy: {
        createdAt: sort,
      } as any,
      include: {
        category: true,
      },
    });
    return Response.json(posts);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function POST(requet: Request) {
  try {
    const { title, content, categoryId } = await requet.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: Number(categoryId),
      },
    });
    return Response.json({
      newPost,
    });
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
