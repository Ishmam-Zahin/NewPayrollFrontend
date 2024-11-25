import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    name: null,
    token: null,
    department: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { name, token, department } = action.payload;
      state.name = name;
      state.token = token;
      state.department = department;
    },
    unsetUser: (state) => {
      state.name = null;
      state.token = null;
      state.department = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
