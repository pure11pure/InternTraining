'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        const data = {
            title, body,
            thumbnail: "Mock.jpg",
            author: "Mock",
            created_at: new Date(),
            updated_at: new Date(),
            status: "published",
            tags: ["intro", "welcome"]
        };

        try {
            // const res = await axios.post(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs/`, data);
            const res = await axios.post(`/api/blogs`, data);
            console.log(res);
            router.push('/blog')
        } catch (error) {
            console.error('Failed to create blog:', error);
        }
    };

    return (
        <form className="flex flex-col p-5" onSubmit={handleCreate}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    className="border border-1 w-full"
                />
            </label>
            <label>
                Body:
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}  // Update body state
                    className="border border-1 w-full"
                />
            </label>
            <button className="bg-sky-400 my-4" type="submit">Submit</button>
        </form>
    );
}
