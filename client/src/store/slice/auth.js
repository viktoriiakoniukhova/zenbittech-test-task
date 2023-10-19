import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://zenbittech-test-server.onrender.com";
const purl = "https://zenbittech-test-task.vercel.app";
//Actions
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/api/auth/register`,
        {
          name,
          email,
          password,
        },
        config
      );
      window.location.href = `${purl}/login`;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/api/auth/login`,
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userEmail", data.data.email);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    const { data } = await axios.get(
      `${url}/api/auth/logout`,
      userEmail,
      config
    );
    localStorage.removeItem("userEmail");
    window.location.reload();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userEmail = localStorage.getItem("userEmail")
  ? localStorage.getItem("userEmail")
  : null;

const initialState = {
  loading: false,
  userEmail,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userEmail = payload;
      state.success = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [logout.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
