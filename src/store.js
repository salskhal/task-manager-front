import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/apiSlice";
// import authReducer from "./slices/auth/authSlice";
// import taskReducer from "./slices/task/taskSlice";
import authReducer from "./redux/authSlice"
import taskReducer from "./redux/taskSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
