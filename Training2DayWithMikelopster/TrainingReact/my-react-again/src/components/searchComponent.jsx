import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

// ข้อมูล mock json สามารถเรียกใช้ได้ เช่นการ fetch จาก local json file
const mockData = [
  { id: 1, name: "Apple", category: "Fruit", price: 1.2 },
  { id: 2, name: "Carrot", category: "Vegetable", price: 0.5 },
  { id: 3, name: "Banana", category: "Fruit", price: 0.8 },
  { id: 4, name: "Broccoli", category: "Vegetable", price: 1.5 },
  { id: 5, name: "Strawberry", category: "Fruit", price: 3.0 },
];

function SearchComponent() {
  // State สำหรับเก็บค่าของ search term, category และ order
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [order, setOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]);

  // useEffect ที่จะทำงานเมื่อ search, category หรือ order เปลี่ยนแปลง
  useEffect(() => {
    // กรองข้อมูลตาม search term, category และเรียงตาม order
    let result = mockData;

    // กรองข้อมูลตาม search term ถ้า search ไม่ว่าง
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // กรองตาม category ถ้าเลือก category อื่นที่ไม่ใช่ "All"
    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    // เรียงลำดับตามราคา (asc หรือ desc)
    if (order === "asc") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      result = result.sort((a, b) => b.price - a.price);
    }

    //  update ข้อมูลที่กรองแล้วใน state
    setFilteredData(result);
  }, [search, category, order]); // dependencies: เมื่อ search, category หรือ order เปลี่ยน ให้ re-run effect

  return (
    <div className="w-[70%] p-2 border">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold pb-2">Search & Filter Items</h1>
        <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
        <Link to="/search">show</Link>
        </button>
      </div>

      <div className="flex flex-row w-full pb-2">
        {/* Input สำหรับกรอก search term */}
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-1 border-gray-300 w-[40%]"
        />

        {/* Dropdown สำหรับเลือก category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-1 border-gray-300 w-[30%]"
        >
          <option value="All">All</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>

        {/* Dropdown สำหรับเลือก order การเรียงลำดับ */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="p-2 border border-1 border-gray-300 w-[30%]"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="p-5 border">
        {/* แสดงข้อมูลที่กรองแล้ว */}
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              {item.name} - {item.category} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchComponent;
