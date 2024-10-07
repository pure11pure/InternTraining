    'use client'

    import { useFormState } from 'react-dom'
    import { login } from './action'

    const initialState = {
        message: '',
    }

    export default function Page() {


        const [state, formAction] = useFormState(login, initialState)

        return (
            <form action={formAction} className="text-center">
                <div className="py-1">
                    <input type="text" name="email" />
                </div>
                <div>
                    <input type="password" name="password" />
                </div>
                <div>
                    Message: {state.message}
                </div>
                <button type="submit" className="bg-sky-600 px-3 rounded-md my-2">Login</button>
            </form>

        )
    }
