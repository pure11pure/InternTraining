// Existing Action Types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// New Action Type
export const SET_COUNT = "SET_COUNT";

// Existing Action Creators
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

// New Action Creator with Payload
export const setCount = (count) => ({
  type: SET_COUNT,
  payload: count,
});