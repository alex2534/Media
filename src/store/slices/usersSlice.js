import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    //This will be the users data
    data: [],
  },
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
