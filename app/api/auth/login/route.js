import { cookies } from 'next/headers'

export async function POST(request) {
    const { email, password } = await request.json()
    console.log("email", email)
    console.log("password", password)

    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error('การล็อกอินล้มเหลว')
        }

        const { access_token } = await response.json()

        // เก็บ access token ใน cookie
        cookies().set('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // หมดอายุใน 1 ชั่วโมง
        })

        return new Response(JSON.stringify({ message: 'ล็อกอินสำเร็จ' }), {
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
