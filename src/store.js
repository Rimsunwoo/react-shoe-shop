import { configureStore, createSlice } from "@reduxjs/toolkit";

let userInfo = createSlice({
  name: "user1",
  initialState: "lim",
});

let cartData = createSlice({
  name: "cartData",
  initialState: [
    // { id: 0, name: "White and Black", count: 2 },
    // { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increase(state, action) {
      state[action.payload].count++;
    },
    decrease(state, action) {
      if (state[action.payload].count > 1) {
        state[action.payload].count--;
      }
    },
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export let { increase, decrease, add, remove } = cartData.actions;

export default configureStore({
  reducer: {
    userInfo: userInfo.reducer,
    cartData: cartData.reducer,
  },
});
