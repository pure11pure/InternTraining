/**
 * TYPE : 2
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// เพราะ createStore ไม่สามารถส่ง object ไปได้โดยตรง
const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;



/**
 * TYPE : 1
 */

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk"; //middleware ที่สามารถใส่ async logic > มันจะช่วยให้โหลดข้อมูลให้เสร็จแล้วค่อย dispatch
// import userReducer from "./reducers/userReducer";

// // ในกรณีที่มีหลาย reducer
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // เพราะ createStore ไม่สามารถส่ง object ไปได้โดยตรง
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;