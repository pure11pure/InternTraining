import Link from "next/link"

async function getBlogs() {
  const res = await fetch('http://localhost:8080/findAllAdmin')

  if (!res.ok) {
    throw new Error('cannot fetch blog')
  }

  return res.json()
}

export default async function Page() {
  const empAll = await getBlogs()

  return (
    <div>
      Employee List:
      {
        empAll.map((emp: any, index: number) => (
          <table>
            <tr key={index}>
              <td>{emp.id}</td>
              <td>{emp.firstname}</td>
              <Link href={`detail/${emp.id}`} className="mx-3 px-3 py-1 text-sky-600 hover:text-sky-950 rounded-md">Read Detail...</Link>
            </tr>
          </table>
        ))
      }
    </div>

  )
}