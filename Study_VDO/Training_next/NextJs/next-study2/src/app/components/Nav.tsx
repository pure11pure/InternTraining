import React from 'react'
import Link from 'next/link'

function Nav() {
    return (
        <div className="flex flex-col items-center">
            {/* <p className=" text-3xl my-5">Home Page</p> */}
            <div className="flex flex-row gap-x-2">
                <Link className="bg-sky-400 px-2 text-center" href="/about">about</Link>
                <Link className="bg-sky-400 px-2 text-center" href="/service">Service</Link>
                <Link className="bg-sky-400 px-2 text-center" href="/blog">Blog</Link>
                <Link className="bg-sky-400 px-2 text-center" href="/contact">Contact</Link>
            </div>

        </div>
    )
}

export default Nav
