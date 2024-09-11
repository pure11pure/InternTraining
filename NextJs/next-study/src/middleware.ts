import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { SignJWT, importJWK, jwtVerify } from 'jose'
import { cookies } from 'next/headers'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    console.log('|   middleware running for', request.url)

    try {
        const token = request.cookies.get('token')?.value
        // Check if token exists
        if (!token) {
            throw new Error('Token not found')
        }
        const secretJWT = {
            kty: 'oct',
            k: process.env.JOSE_SECRET
        }
        const secretKey = await importJWK(secretJWT, 'HS256')
        const { payload } = await jwtVerify(token, secretKey)
        console.log(payload)
        if (payload.email !== 'pure') {
            throw new Error('email incorrect')
        }
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user', JSON.stringify({ email: payload.email }))
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        })
        return response
    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: ['/content/:path*' ]
    matcher: ['/manage/blog/:path*']
}