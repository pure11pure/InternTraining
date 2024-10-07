import { useState, useEffect } from 'react'

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    //  Function  async สำหรับการดึงข้อมูล
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // เรียกใช้ Function  fetchUsers
    fetchUsers()
  }, []) // ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

  return (
    <div className='w-[30%] p-2 border'>
      <h2 className='text-2xl font-bold pb-2'>User List</h2>
      <div>
        {users.map((user) => (
          <div key={user.id} className='py-1 pl-5'>{user.name}</div>
        ))}
      </div>
    </div>
  )
}

export default UserList