import { createSlice } from "@reduxjs/toolkit";
//The get thunk
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    //This will be the users data
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      //Update the state object however appropriate
      //to show the user, we are loading data.
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      //Receving the payload from the thunk function
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
