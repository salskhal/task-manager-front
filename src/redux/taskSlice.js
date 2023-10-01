import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialTask = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : null;

const initialState = {
  taskData: initialTask,
  AllTasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setTask: (state, action) => {
      state.taskData = action.payload;
    },
    setAllTasks: (state, action) => {
      state.AllTasks = action.payload;
    },
  },
});

export const { setTask, setAllTasks } = taskSlice.actions;

export default taskSlice.reducer;

export const getTask = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/tasks");
    dispatch(setAllTasks(data));
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/tasks/${id}`);
    dispatch(setTask(data));
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/tasks", task);
    dispatch(setTask(data));
    dispatch(getTask());
    toast.success("Create task success");
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (task, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/tasks/${id}`, task);
    dispatch(setTask(data));
    dispatch(getTask());
    toast.success("Update task success");
  } catch (error) {
    console.log(error.mesage);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    dispatch(getTask());
    toast.success("Delete task success");
  } catch (error) {
    console.log(error);
    toast.error("Delete task failed");
  }
};
