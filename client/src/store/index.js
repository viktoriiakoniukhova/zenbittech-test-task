import { configureStore } from "@reduxjs/toolkit";
import dealsReducer from "./slice/deals";
import authReducer from "./slice/auth";

export default configureStore({
  reducer: {
    deals: dealsReducer,
    auth: authReducer,
  },
});
