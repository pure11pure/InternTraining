'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Create = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        try {
            // const query = new URLSearchParams({ category, search, sort }).toString()
            const res = await axios.get(`/api/categories`)
            setCategories(res.data)
        } catch (error) {
            console.log(error)
            setCategories([])
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()  //
        console.log('title: ', title)
        console.log('content: ', content)
        console.log('category: ', categoryId)

        try {
            await axios.post('/api/posts', {
                title,
                content,
                categoryId
            })
            router.push('/') //เปลี่ยนหน้า
        } catch (error) {
            console.error(error)
            alert('something went wrong')
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label>Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        required
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create