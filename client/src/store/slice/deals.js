import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";
//Action
export const fetchDeals = createAsyncThunk("fetchDeals", async () => {
  try {
    const response = await axios.get(`${url}/api/deal/all`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  extraReducers: {
    [fetchDeals.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchDeals.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    },
    [fetchDeals.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default dealsSlice.reducer;
