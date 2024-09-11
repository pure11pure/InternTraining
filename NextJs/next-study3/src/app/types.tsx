export interface Data {
    id: number,
    title: string,
    body: string
}

export interface PostListProps {
    posts: Data[]
}