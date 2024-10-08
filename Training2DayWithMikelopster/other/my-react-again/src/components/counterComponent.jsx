import { useReducer } from "react";
import { CounterReducer, initialState } from "../reducers/counterReducer";

export default function CounterComponent() {
  // ใช้ useReducer ในการจัดการ state ของ counter
  const [state, dispatch] = useReducer(CounterReducer, initialState);

  return (
    <div>
      <p className="text-xl text-white font-bold text-center p-3 bg-pink-500 m-3 rounded">
        Count: {state.count}
      </p>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        className="bg-sky-600 p-2 text-white font-bold rounded mx-2"
      >
        &lt; Decrement
      </button>
      <button
        onClick={() => dispatch({ type: "increment" })}
        className="bg-sky-600 p-2 text-white font-bold rounded mx-2"
      >
        {" "}
        Increment &gt;
      </button>
    </div>
  );
}
