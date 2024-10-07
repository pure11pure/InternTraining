import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    const token = access_token.value

    try {
        const response = await fetch('http://localhost:3001/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('token มีปัญหา')
        }

        const data = await response.json();

        return new Response(JSON.stringify({ message: data.email }), {
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
