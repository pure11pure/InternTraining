import "./App.css";
import Checkbox from "./components/Checkbox";

import { useState } from "react";
import VideoPlayer from "./components/Video";

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

  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsplaying] = useState(false)

  function btnCounter() {
    setCounter(counter + 1);
  }

  function triggerPlayer(){
    setIsplaying(!isPlaying)
  }

  return (
    <>
      <div>
        <VideoPlayer
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          isPlaying={isPlaying}
        />
       <button onClick={triggerPlayer}>{isPlaying ? "pause" : "play"}</button>
      </div>
      <diV>
        New counter is {counter}
        <button onClick={btnCounter}>Add Counter</button>
      </diV>
      <div>
        {todoList.map((todo, index) => (
          <Checkbox key={index} text={todo.text} isChecked={todo.isChecked} />
        ))}
      </div>
    </>
  );
}

export default App;
