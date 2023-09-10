import { createSlice } from "@reduxjs/toolkit";
//The get thunk
import { fetchUsers } from "../thunks/fetchUsers";
//The post Thunk
import { addUser } from "../thunks/addUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    //This will be the users data
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    //fething user
    builder.addCase(fetchUsers.pending, (state, action) => {
      //Update the state object however appropriate
      //to show the user, we are loading data.
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      //Receiving the payload from the thunk function
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //Adding user
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
