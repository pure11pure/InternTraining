'use server'

import { SignJWT, importJWK } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: { message: string }, formData: FormData): Promise<{ message: string }> {
    const email = formData.get('email')
    const password = formData.get('password')

    if (email !== 'pure' || password !== '1234') {
        return { message: 'Login failed. Please try again.' };
    }

    const secretJWT = {
        kty: 'oct',
        k: process.env.JOSE_SECRET
    }

    const secretKey = await importJWK(secretJWT, 'HS256')
    const token = await new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1h').sign(secretKey)
    // Set cookie
    cookies().set('token', token)

    redirect('/manage/blog')
    // return { message: 'Login successful!' };
}

