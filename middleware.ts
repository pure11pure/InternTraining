import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('access_token');

  console.log("Middleware triggered for path:", path);
  console.log("Token:", token);

  // สำหรับเส้นทาง /blog
  if (path.startsWith('/blog')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // สำหรับเส้นทางอื่นๆ ที่ไม่มี token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้ามี token ให้ดำเนินการต่อ
  return NextResponse.next();
}

// กำหนด paths ที่ต้องการให้ middleware ทำงาน
// export const config = {
//   matcher: [
//     '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
//   ],
// };

export const config = {
    matcher: '/blog/:path*',  // Test only for blog paths
  };
