'use client'

// import { useState, useEffect } from "react"

// async function getEmpDetail(slug: number) {
//     const res = await fetch(`http://localhost:8080/findUserById?userId=${slug}`)

//     if (!res.ok) {
//         throw new Error('cannot fetch blog')
//     }
//     return res.json()
// }

// export default function Page({ params }: { params: { slug: number } }) {

//     const [emp, setEmp] = useState({
//         empCode: '',
//         title: '',
//         firstname: '',
//         lastname: '',
//         positionName: '',
//         email: '',
//         level: '',
//         typeEmp: '',
//         startDate: '',
//         passDate: '',
//         dept_actual: 0,
//         sector_actual: 0,
//         deptID: [0],
//         companyID: [0],
//         sectorID: [0],
//         roles: [''] 
//     })

//     const initEmp = async () => {
//         try {
//             const result = (await getEmpDetail(params.slug)).responseData.result
//             setEmp(result)
//             console.log(result)
//         } catch (error) {
//             console.log('error', error)
//         }

//     }

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target
//         setEmp((prevState) => ({
//             ...prevState,
//             [name]: value
//         }))
//     }

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event?.preventDefault()
//         console.log('Form Submit', emp)
//         try {
//             const response = await fetch(`http://localhost:8080/editEmployee?userId=${params.slug}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(emp)
//             })

//             console.log(response)

//             if (!response.ok) {
//                 // throw new Error('Network response was not ok')
//                 const errorText = await response.text(); // อ่านข้อความข้อผิดพลาด
//                 throw new Error(`Failed to update employee: ${errorText}`);
//             }

//             const responseData = await response.json()
//             console.log(responseData)
//         } catch (error) {
//             console.error(error)
//             throw error
//         }
//     }

//     useEffect(() => {
//         initEmp()
//     }, [params.slug])

//     return (
//         <div>
//             <p>ID : {params.slug}</p>
//             <p>รหัสพนักงาน : ({emp.empCode})</p>
//             <form onSubmit={handleSubmit}>
//                 <input name="empCode" type="text" value={emp.empCode} onChange={handleChange} />
//                 <button>update</button>
//             </form>
//             <p>ชื่อ-สกุล: {emp.firstname} {emp.lastname} </p>
//             <p>email: {emp.email} </p>
//         </div>
//     )
// }



import { useState, useEffect } from "react";

async function getEmpDetail(slug: number) {
    const res = await fetch(`http://localhost:8080/findDepartmentsByUser?userId=${slug}`);
    if (!res.ok) {
        throw new Error('cannot fetch blog');
    }
    return res.json();
}

export default function Page({ params }: { params: { slug: number } }) {

    const [emp, setEmp] = useState({
        deptName: '',
        deptCode: '',
        deptFullName: null,
        deptTname: null,
        sectorId: 0
    });

    const [deptID, setDeptID] = useState(0)

    const initEmp = async () => {
        try {
            const result = (await getEmpDetail(params.slug))[0][0];
            console.log(result)
            setEmp({
                deptName: result.sectors[0]?.departments[0]?.deptname || '', // Adjust as necessary
                deptCode: result.sectors[0]?.departments[0]?.deptcode || '', // Adjust as necessary
                deptFullName: null, // Set these values based on your API's response or leave as empty
                deptTname: null, // Set these values based on your API's response or leave as empty
                sectorId: result.sectors[0]?.sectorId || 0 // Adjust as necessary
            });
            setDeptID(result.sectors[0]?.departments[0]?.deptid)
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEmp((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        console.log('Form Submit', emp);
        console.log('Form Submit', deptID);
        try {
            const response = await fetch(`http://localhost:8080/editDepartment?departmentId=${deptID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deptName: emp.deptName,
                    deptCode: emp.deptCode,
                    deptFullName: emp.deptFullName,
                    deptTname: emp.deptTname,
                    sectorId: emp.sectorId
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update employee: ${errorText}`);
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        initEmp();
    }, [params.slug]);

    return (
        <div>
            <p>ID : {params.slug}</p>
            <form onSubmit={handleSubmit}>
                <input
                    name="deptName"
                    type="text"
                    value={emp.deptName || ''}
                    onChange={handleChange}
                    placeholder="Department Name"
                />
                <input
                    name="deptCode"
                    type="text"
                    value={emp.deptCode || ''}
                    onChange={handleChange}
                    placeholder="Department Code"
                />
                <input
                    name="deptFullName"
                    type="text"
                    value={emp.deptFullName || ''}
                    onChange={handleChange}
                    placeholder="Department Full Name"
                />
                <input
                    name="deptTname"
                    type="text"
                    value={emp.deptTname || ''}
                    onChange={handleChange}
                    placeholder="Department Tname"
                />
                <input
                    name="sectorId"
                    type="number"
                    value={emp.sectorId || ''}
                    onChange={handleChange}
                    placeholder="Sector ID"
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
