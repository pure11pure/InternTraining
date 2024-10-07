import { NextResponse } from "next/server";

export async function middleware(request) {
    console.log('|   middleware running for', request.url)

    const token = request.cookies.get('token');

    console.log(token.value)

    if (!token) {
        console.log("No token found, redirecting to login");
        return NextResponse.redirect(new URL('/login', request.url)); // เปลี่ยนเส้นทางไปที่หน้า login
    }

    try {
        let response = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}` // ตรวจสอบว่า token มีค่า
            }
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const responseJSON = await response.json();

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('users', JSON.stringify({ email: responseJSON.email}))

        // ส่งข้อมูลที่เป็น object ไม่ได้ เลยต้องใช้เป็น text
        return NextResponse.next({
            request:{
                headers:requestHeaders
            }
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.redirect(new URL('/login', request.url)); // เปลี่ยนเส้นทางไปที่หน้า login หากเกิดข้อผิดพลาด
    }

}

// export const config = {
//     matcher: ['special-blogs/:path*']
// }

export const config = {
    matcher: ['/special-blogs/:path*']
}