// จังหวะแรกโหลดข้อมูล api ก่อนและ แสดง
//  เวลากด F12 จะเห็นข้อมูล เพราะโหลดมาก่อนแล้วค่อยโชว์หน้าเว็บ
// แสดง render

import { Suspense } from "react"
import Loading from "./loading"

async function getBlogs() {
    const res = await fetch('http://localhost:8080/findallUserListByDeptActual?deptId=5')

    if (!res.ok) {
        throw new Error('cannot fetch blog')
    }

    return res.json()
}

export default async function Page() {
    const empAll = await getBlogs()

    return (
        <div>
            <p className="font-bold ">hi</p>
            {/* <Suspense fallback={<Loading />}> */}
            <div>
                Hello Content Page
                {
                    empAll.responseData.result.map((emp: any, index: number) => (
                        <div key={index}>
                            {emp.id} : {emp.firstname}
                        </div>
                    ))
                }
            </div>
        {/* </Suspense> */}
        </div>
        
    )
}