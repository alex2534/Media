import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

//Exporting Thunk functions so it can be used in the react app
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
