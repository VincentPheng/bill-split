import { createSlice } from "@reduxjs/toolkit";

export const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, item) => {
      state.items.push(item);
    },
    updateCheckbox: (state, payee, index) => {
      state.items[index].payees[payee] = !state.items[index].payees[payee];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, updateCheckbox } = receiptSlice.actions;

export default receiptSlice.reducer;
