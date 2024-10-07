'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateBlog({ params }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const blogId = params.id;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs/${blogId}`);
                const blog = await res.json();
                setTitle(blog.title);
                setBody(blog.body);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            }
        };

        fetchBlog();
    }, [blogId]);



    const handleCreate = async (e) => {
        e.preventDefault();
        const data = { title, body };

        try {
            const res = await axios.put(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs/${blogId}`, data);
            console.log(res)
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
