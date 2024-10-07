// !Server component
// can use async and await
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function Blog() {
    const router = useRouter();

    const [blogs, setBlogs] = useState([]);
    async function handleDelete(id) {
        try {
            // const res = await axios.delete(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs/${id}`);
            const data = { id }
            const res = await axios.delete(`/api/blogs`, data);
            console.log(res)
            fetchBlogs()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBlogs = async () => {
        try {
            // const res = await axios.get(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs`);
            const res = await axios.get('/api/blogs');
            console.log(res.data)
            setBlogs(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    async function handleLogout() {
        try {
            const res = await axios.get(`/api/auth/logout`);
            console.log(res)
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-row gap-24">
                <Link href={`/blog/add`} className="bg-green-400 p-4 rounded text-white font-bold"> + Create</Link>
                <button onClick={handleLogout} className="bg-red-400 p-4 rounded text-white font-bold">logout</button>
            </div>
            <h1 className="text-2xl font-bold py-5">All Post</h1>
            <ul>
                {blogs.map((blog) => (

                    <li key={blog.id}>
                        <h2 className="font-bold">{blog.title}</h2>
                        <p>{blog.body}</p>
                        <div className="flex flex-row gap-3">
                            <Link href={`/blog/${blog.id}`} className="text-blue-700" >Link</Link>
                            <Link href={`/blog/edit/${blog.id}`} className="text-orange-600" >edit</Link>
                            <button
                                className="text-red-700"
                                onClick={() => handleDelete(blog.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    )
}