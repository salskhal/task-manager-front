// Importing Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask } from "../../../redux/taskSlice";
import "./UpdateTaskModal.css";

// Importing Components

const UpdateTaskModal = ({ showUpdateModal, setShowUpdateModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To-do");
  const [priority, setPriority] = useState("Low");

  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.task);

  const { taskData } = taskList;

  useEffect(() => {
    if (showUpdateModal) {
      setName(taskData.name);
      setDescription(taskData.description);
      setStatus(taskData.status);
      setPriority(taskData.priority);
    }
  }, [showUpdateModal, taskData]);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowUpdateModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      name,
      description,
      status,
      priority,
    };

    try {
      dispatch(updateTask(task, taskData._id));

      setTimeout(() => {
        setShowUpdateModal(false);
        // dispatch(getTask());
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    try {
      dispatch(deleteTask(taskData._id));

      setTimeout(() => {
        setShowUpdateModal(false);
        // dispatch(getTask());
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!showUpdateModal) {
    return null;
  }

  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="modal w-4/5 md:w-2/5">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <form className="flex flex-col gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline
                    "
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline
                    "
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Status
              </label>
              <select
                id="status"
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline
                    "
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline
                    "
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="
                    bg-blue-500
                    hover:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                    focus:outline-none
                    focus:shadow-outline
                    "
                type="submit"
                //   disabled={loading}
                onClick={(e) => handleSubmit(e)}
              >
                Update Task
              </button>
              <button
                className="
                        bg-red-500
                        hover:bg-red-700
                        text-white
                        font-bold
                        py-2
                        px-4
                        rounded
                        focus:outline-none
                        focus:shadow-outline
                        "
                type="button"
                //   disabled={loading}
                onClick={(e) => handleDelete(e)}
              >
                Delete Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
