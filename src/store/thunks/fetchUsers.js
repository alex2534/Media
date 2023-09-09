import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//The "users/fetch" is our base type that discribe the purpose of the request
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    // In this thunk request, we return the data that we need to use in the reducer.
    const response = await axios.get('http://localhost:3005/users');
    //Whatever returned in here will be passed as a payload
    return response.data;
});
//Then export the asyncThunk
export {fetchUsers};