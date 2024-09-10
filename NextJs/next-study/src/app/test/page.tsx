'use client'

// จังหวะแรกโหลดแค่หน้า ข้อมูล api ตามมาทีหลัง
//  เวลากด F12 จะไม่เห็นข้อมูล เพราะตามมาทีหลัง
// จัดการ useState , useEffect

import { useState, useEffect } from 'react'

async function getBlogs() {
    const res = await fetch('http://localhost:8080/findallUserListByDeptActual?deptId=5')

    if (!res.ok) {
        throw new Error('cannot fetch blog')
    }

    return res.json()
}

export default function Page() {
    const [emp, setEmp] = useState([])

    const initEmp = async () => {
        try {
            const result = await getBlogs()
            setEmp(result.responseData.result)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        initEmp()
        console.log('use effect')
    }, [])

    console.log("emp > ", emp)

    return (
        <div>
            Hello Test Page2
            {
                emp.map((emp: any, index: number) => (
                    <div key={index}>
                        {emp.id} : {emp.firstname}
                    </div>
                ))
            }

            {/* {emp.length > 0 ? (
                emp.map((emp: any, index: number) => (
                    <div key={index}>
                        {emp.id} : {emp.firstname}
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )} */}
        </div>
    )
}
