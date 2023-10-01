import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import history from "../history";
import { toast } from "react-toastify";

const initialUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  isLoading: false,
  currentUser: initialUser,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    removeUserInfo: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const login = (credentials) => async (dispatch) => {
  console.log(credentials);
  try {
    const response = await axios.post("/api/users/auth", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch(setUserInfo(response.data));
      toast.success("Login success");
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("auth");
  dispatch(removeUserInfo());

  toast.success("Logout success");
};

export const register = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch(setUserInfo(response.data));

      toast.success("Register success");
    } else {
      toast.error("Register failed");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
