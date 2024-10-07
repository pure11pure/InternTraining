'use client'

// เพื่อใช้ state

import { useFormState } from 'react-dom'
import { login } from './action'

export default function Page() {

    const initState = {
        message: null
    }

    const [state, formAction] = useFormState(login, initState)

    return (
        <form action={formAction} className='container mx-auto'>
            <div >Email <input name="email" className='border-2'/></div>
            <div >Password <input type="password" name="password" className='border-2'/></div>
            message: {state?.message}
            <div><button  className='bg-blue-800 rounded p-2'>Login</button></div>
        </form>
    )
}