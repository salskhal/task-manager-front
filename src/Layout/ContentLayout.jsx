import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header/Header";
import AddTaskModal from "../components/modals/AddTask/AddTaskModal";
import UpdateTaskModal from "../components/modals/UpdateTask/UpdateTaskModal";

const ContentLayout = ({
  showModal,
  setShowModal,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  // const [showModal, setShowModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <AddTaskModal showModal={showModal} setShowModal={setShowModal} />
      <UpdateTaskModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
      <Header showModal={showModal} setShowModal={setShowModal} />
      <Outlet
        showModal={showModal}
        setShowModal={setShowModal}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </div>
  );
};

export default ContentLayout;
