import { createSlice } from "@reduxjs/toolkit";

export const payeeSlice = createSlice({
  name: "payees",
  initialState: {
    obj: {},
  },
  reducers: {
    storePayeeObject: (state, payees) => {
      state.obj = payees;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storePayeeObject } = payeeSlice.actions;

export default payeeSlice.reducer;
