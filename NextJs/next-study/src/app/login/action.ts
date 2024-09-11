'use server'

export async function login(prevState: { message: string }, formData: FormData): Promise<{ message: string }> {
    const email = formData.get('email')
    const password = formData.get('password')

    if (email !== 'pure' || password !== '1234') {
        return { message: 'Login failed. Please try again.' };
    }

    return { message: 'Login successful!' };
}

