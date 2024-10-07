'use server'

import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(prevState, formData) {

    try {

        const email = formData.get('email')
        const password = formData.get('password')
        const res = await axios.post(`${process.env.STRAPI_BASE_URL}/api/auth/local`, {
            identifier: email,
            password: password
        })

        cookies().set('token', res.data.jwt)
        // return { message: 'login ok!'}

    } catch (error) {
        console.log("error", error.response)
        let errorMsg;
        if (error.response && error.response.data.error.message) {
            errorMsg = error.response.data.error.message
        }
        return { message: errorMsg || 'Login fail' }
    }

    redirect('/special-blogs')
}