import axios from 'axios';
import Link from 'next/link';

const fetchBlog = async () => {
  try {
    const res = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs`)
    // console.log(res.data)
    return [res.data.data]

  } catch (error) {
    console.error(error)
    return []
  }
}



export default async function Home() {

  const blogs = (await fetchBlog())[0]
  // console.log(blogs)

  return (
    <div className='container mx-auto '>
      <div className='text-3xl font-bold mb-7'>hello page</div>
      <div className='grid grid-cols-4 gap-2'>
        {
          blogs.map((blog, index) => (
            <div key={index} className='border rounded p-2 '>
              {/* <div>ID: {blog.id}</div> */}
              <div className='text-2xl font-semibold'>{blog.title}</div>
              <div className=''>{blog.description}</div>
              <Link href={`blog/${blog.documentId}`} className='text-blue-800 underline active:text-violet-500'>see more</Link>
            </div>
          )

          )
        }
      </div>
    </div>
  );
}
