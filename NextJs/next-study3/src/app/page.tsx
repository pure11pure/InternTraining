'use client'

import { useState, useEffect } from "react";
import Header from './component/Header'

interface Data {
  id: number,
  title: string,
  body: string
}

export default function Home() {

  const [data, setData] = useState<Data[]>([]);

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const myPlusFunc = (num1: number, num2: number) => {
    return num1 + num2  
  }

  const result = myPlusFunc(199, 399)

  console.log(data)

  useEffect(() => {

    const fetchData = async () => {

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const jsonData = await res.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error", error)
      }
    }

    fetchData()

  }, [])



  return (
    <div>
      <Header title="NEXTJS X TypeScript" />
      <p>{result}</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>title: {item.title}</h3>
            <p>body: {item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
