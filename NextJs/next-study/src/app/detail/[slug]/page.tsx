async function getEmpDetail(slug : number) {
    const res = await fetch(`http://localhost:8080/findUserById?userId=${slug}`)
  
    if (!res.ok) {
      throw new Error('cannot fetch blog')
    }
  
    return res.json()
  }

export default async function Page({params} : {params: { slug : number}}){

    const empDetail = (await getEmpDetail(params.slug)).responseData.result
    console.log(empDetail)
    return (
        <div>
           ID : {params.slug} 
           <p>รหัสพนักงาน : {empDetail.empCode} </p>
           <p>ชื่อ-สกุล: {empDetail.firstname} {empDetail.lastname} </p>
           <p>email: {empDetail.email} </p>
           <p>role: {empDetail.roles[0].role} </p>
        </div>
    )
}