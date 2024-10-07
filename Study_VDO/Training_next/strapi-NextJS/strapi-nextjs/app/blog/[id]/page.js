import axios from 'axios';

const fetchDetailBlog = async (id) => {
  try {
    const res = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate[0]=author&populate[1]=thumbnail`)
    // console.log(res.data)
    return [res.data.data]

  } catch (error) {
    console.error(error)
    return []
  }
}



export default async function blog({ params }) {

    const blogId = params.id
    // console.log(blogId)

    const blog = (await fetchDetailBlog(blogId))[0];
    // console.log("blog.thumbnail", blog)


  return (
    <div className='container mx-auto '>
        <div className='test-2xl'>{blog.id} : {blog.title}</div>
        <img src={`${process.env.STRAPI_BASE_URL}${blog.thumbnail.url}`} width="100px" />
        <div>written by : {blog.author.name} </div>
    </div>
  );
}
