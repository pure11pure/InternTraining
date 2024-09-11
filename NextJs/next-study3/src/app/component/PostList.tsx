
import React from 'react'
import { PostListProps } from '../types'

const PostList = ({ posts }: PostListProps) => {
    return (
        <div>
            <ul>
                {posts.map((item) => (
                    <li key={item.id}>
                        <h3>title: {item.title}</h3>
                        <p>body: {item.body}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default PostList
