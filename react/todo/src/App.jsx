import "./App.css";
import Header from "./components/Header";
import { IconA } from "./components/Icon";
import Image from "./components/Image";
import Checkbox from "./components/Checkbox";

function App() {
  const todoList = [
    {
      text: "coding react",
      isChecked: false,
    },
    {
      text: "doing document",
      isChecked: false,
    },
    {
      text: "test react",
      isChecked: true,
    },
  ];

  /* Type 1 */
  // return (
  //   <>
  //     <div>
  //       {todoList.map((todo, index) => {
  //         return (
  //           <Checkbox key={index} text={todo.text} isChecked={todo.isChecked} />
  //         );
  //       })}
  //     </div>
  //   </>
  // );

  /* Type2 : เพราะ .map มันจะมีการ return อยู่แล้ว*/
  return (
    <>
      <div>
        {todoList.map((todo, index) => (
          <Checkbox key={index} text={todo.text} isChecked={todo.isChecked} />
        ))}
      </div>
    </>
  );
}

export default App;
