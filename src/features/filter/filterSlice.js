import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  colors: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    statusChange: (state, action) => {
      state.status = action.payload;
    },
    addColor: (state, action) => {
      state.colors.push(action.payload);
    },
    removeColor: (state, action) => {
      const removeIndex = state.colors.indexOf(action.payload);
      if (removeIndex !== -1) {
        state.colors.splice(removeIndex, 1);
      }
    },
  },
});

export default filterSlice.reducer;

export const { statusChange, addColor, removeColor } = filterSlice.actions;
