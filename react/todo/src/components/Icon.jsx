// จะถูกใช้ใน component ที่มีการนำเข้าเท่านััน
import style from './Icon.module.css'

export function IconA() {
  return <div className= {style.blue}>Icon A</div>;
}

export function IconB() {
  return <div>Icon B</div>;
}


// Global 
// import './Icon.css'
// export function IconA() {
//     return <div className= 'blue'>Icon A</div>;
//   }