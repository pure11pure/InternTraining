export default async function Blog({ params }) {

    const blogId = params.id
    console.log(blogId)
    

    const res = await fetch(`https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs/${blogId}`)
    const blog = await res.json()

    console.log(blog)

    return (<div>
        <h1> Blog : {params.id}</h1>
        <p>title : {blog.title}</p>
        <p>body : {blog.body}</p>
    </div>)
}