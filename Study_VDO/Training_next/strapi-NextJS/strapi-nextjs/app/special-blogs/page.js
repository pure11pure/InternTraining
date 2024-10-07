import axios from 'axios';
import Link from 'next/link';
import { cookies, headers } from 'next/headers';

const fetchSpecialBlog = async () => {
  try {

    const token = cookies().get('token')
    console.log("token : ",token)
    const res = await axios.get(`${process.env.STRAPI_BASE_URL}/api/special-blogs`, {
      headers: {
        'Authorization' : `Bearer ${token.value}`
      }
    })
    console.log('fetchSpecialBlog' , res.data)
    return [res.data.data]

  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function special() {

    const blogs = (await fetchSpecialBlog())[0]

    const headerList = headers()
    const user = JSON.parse(headerList.get('users')) //แปลงเป็น JSON
  
    return (
      <div className='container mx-auto '>
        <div className='text-3xl font-bold mb-7'>special page  {user.email} </div>
        <div className='grid grid-cols-3 gap-2'>
          {
            blogs.map((blog, index) => (
              <div key={index} className='border rounded p-2 '>
                <div className='text-2xl font-semibold'>{blog.title}</div>
                <div className=''>{blog.description}</div>
                {/* <Link href={`blog/${blog.documentId}`} className='text-blue-800 underline active:text-violet-500'>see more</Link> */}
              </div>
            )
  
            )
          }
        </div>
      </div>
    );
  }
  