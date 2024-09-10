

import {login} from './action'

export default function Page() {

    return (
        <form action={login} className="text-center">
            <div className="py-1">
                <input type="text" name="email" />
            </div>
            <div>
                <input type="password" name="password" />
            </div>
            <button className="bg-sky-600 px-3 rounded-md my-2">Login</button>

        </form>
    )

}