import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//The "users/fetch" is our base type that describe the purpose of the request
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  // In this thunk request, we return the data that we need to use in the reducer.
  const response = await axios.get("http://localhost:3005/users");
  //Whatever returned in here will be passed as a payload
  //DEV ONLY !!!
  await pause(1000);
  return response.data;
});

//DEV ONLY !!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

//Then export the asyncThunk
export { fetchUsers };
