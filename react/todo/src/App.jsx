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

  return (
    <>
      {/* <Header />
      <div>Hello</div>
      <IconA />
      <Image
        imageUrl={
          "https://fastly.picsum.photos/id/472/200/300.jpg?hmac=QWrw_-haGekq7e6hrwtMmL7cjpfQkkX946dg8swfWLE"
        }
      /> */}
      <Checkbox text="coding react" isChecked={false} />
      <Checkbox text="doing document" isChecked={true} />
      <Checkbox text="test react" isChecked={false} />
    </>
  );
}

export default App;
