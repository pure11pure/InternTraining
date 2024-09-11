'use client'

import { useState, useEffect } from "react";

interface Data {
  id: number,
  title: string,
  body: string
}

export default function Home() {

  const [data, setData] = useState<Data[]>([]);

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
