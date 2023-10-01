import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setTask } from "../redux/taskSlice";

const StatusCard = ({ task, showUpdateModal, setShowUpdateModal }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(setTask(task));
    setShowUpdateModal(true);
  };
  return (
    <div
      className="bg-white py-8 px-4 rounded-xl cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      <h1 className="font-semibold text-lg mb-3 uppercase">{task.name}</h1>
      <p className="text-gray-400">{task.description}</p>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor:
                task.status === "To-do"
                  ? "red"
                  : task.status === "Doing"
                  ? "yellow"
                  : "green",
            }}
          ></div>
          <p className="text-gray-400 ml-2">{task.status}</p>
        </div>
        <div className="flex items-center">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor:
                task.priority === "High"
                  ? "red"
                  : task.priority === "Medium"
                  ? "yellow"
                  : "green",
            }}
          ></div>
          <p className="text-gray-400 ml-2">{task.priority}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
