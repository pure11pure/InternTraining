// สร้าง reducer function ที่จัดการการเปลี่ยนแปลง state
export function CounterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}


export const initialState = { count: 0 }; // สร้างตัวแปรสำหรับค่าเริ่มต้น