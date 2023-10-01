import { createTask, getTask } from "../../../redux/taskSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

import "./AddTaskModal.css";

const AddTaskModal = ({ showModal, setShowModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("dd");
  const [status, setStatus] = useState("To-do");
  const [priority, setPriority] = useState("Low");
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowModal(false);
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      name,
      description,
      status,
      priority,
    };

    try {
      dispatch(createTask(task));

      setTimeout(() => {
        setShowModal(false);
        dispatch(getTask());
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!showModal) {
    return null;
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="modal w-4/5 md:w-2/5">
        <h3 className="font-semibold text-xl mb-4">Add New Task</h3>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h3>Title</h3>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 capitalize"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
              required
            />
          </div>
          <div>
            <h3>Deescription</h3>

            <textarea
              className="focus:outline-none p-2.5 bg-gray-50"
              placeholder="Some Text...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <h3>Status</h3>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>To-do</option>
              <option>Doing</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <h3>Priority</h3>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button className="bg-indigo-600 w-full mt-3 rounded-lg py-3 text-white font-medium text-lg">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
