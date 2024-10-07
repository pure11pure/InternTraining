import { cookies } from 'next/headers'

export async function GET() {
    try {
        cookies().set('access_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1, // หมดอายุใน 1 ชั่วโมง
        })

        return new Response(JSON.stringify({ message: 'logout success' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
