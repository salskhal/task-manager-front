import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../redux/taskSlice";
import StatusCard from "../components/StatusCard";
import AddTaskModal from "../components/modals/AddTask/AddTaskModal";

export default function Home({ showUpdateModal, setShowUpdateModal }) {
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.task);

  const { AllTasks } = taskList;

  let todo = [];
  let doing = [];
  let completed = [];

  if (AllTasks) {
    AllTasks.map((task) => {
      if (task.status === "To-do") {
        todo.push(task);
      } else if (task.status === "Doing") {
        doing.push(task);
      } else if (task.status === "Completed") {
        completed.push(task);
      }
    });
  }

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);
  return (
    <div
      className="
      p-10
      md:p-20
       "
    >
      {AllTasks && AllTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold text-gray-900">No Tasks</h1>
          <p className="text-gray-500 mt-2">Add a task to get started</p>

          <div className="mt-10"></div>
        </div>
      ) : (
        <main>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-slate-100 px-4 py-8 flex flex-col gap-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <p className="font-medium">To Do</p>
                <p className="text-green-600 px-3 py-1 rounded-md bg-green-200">
                  {todo.length}
                </p>
              </div>
              {todo.map((task) => (
                <StatusCard
                  task={task}
                  key={task._id}
                  showUpdateModal={showUpdateModal}
                  setShowUpdateModal={setShowUpdateModal}
                />
              ))}
            </div>
            <div className="bg-slate-100 px-4 py-8 flex flex-col gap-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <p className="font-medium">Doing</p>
                <p className="text-green-600 px-3 py-1 rounded-md bg-green-200">
                  {doing.length}
                </p>
              </div>
              {doing.map((task) => (
                <StatusCard
                  task={task}
                  key={task._id}
                  showUpdateModal={showUpdateModal}
                  setShowUpdateModal={setShowUpdateModal}
                />
              ))}
            </div>
            <div className="bg-slate-100 px-4 py-8 flex flex-col gap-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <p className="font-medium">Completed</p>
                <p className="text-green-600 px-3 py-1 rounded-md bg-green-200">
                  {completed.length}
                </p>
              </div>
              {completed.map((task) => (
                <StatusCard
                  task={task}
                  key={task._id}
                  showUpdateModal={showUpdateModal}
                  setShowUpdateModal={setShowUpdateModal}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
