'use server'

export async function login(formData:any) {
    const email = formData.get('email')
    const password = formData.get('password')

    console.log("email: ", email)
    console.log("password: ", password)
}