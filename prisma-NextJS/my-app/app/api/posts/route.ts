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
        category,
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
      orderBy:  {
        createdAt: sort,
      } as any,
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
    const { title, content, category } = await requet.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category,
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
