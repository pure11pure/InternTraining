# React + Vite

- [https://docs.mikelopster.dev/c/web-workshop-pccth/day1-react]

# Start

- ติดตั้งผ่าน vite

```
npm create vite@latest my-react-app -- --template react
```

- การทำ prop type [https://www.geeksforgeeks.org/reactjs-proptypes/]
- Passing Props to a Component [https://react.dev/learn/passing-props-to-a-component]

```
npm i prop-types
```

```
import PropTypes from 'prop-types'
// Component ที่ใช้ prop-types เพื่อตรวจสอบชนิดของ props
function Greeting({ name, age, isMember }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      {isMember ? <p>Status: Member</p> : <p>Status: Non-Member</p>}
    </div>
  )
}

// การกำหนด prop-types เพื่อระบุชนิดข้อมูลที่คาดหวัง
Greeting.propTypes = {
  name: PropTypes.string.isRequired, // name ต้องเป็น string และเป็น required
  age: PropTypes.number.isRequired, // age ต้องเป็น number และเป็น required
  isMember: PropTypes.bool, // isMember ต้องเป็น boolean (ไม่จำเป็นต้องส่งมา)
}

// การส่งค่า props ให้ Component
function App() {
  return (
    <div>
      <Greeting name="John" age={30} isMember={true} />
    </div>
  )
}

export default App
```


- React Router (library)
- [https://reactrouter.com/en/main/start/tutorial]
```
npm install react-router-dom
``` 