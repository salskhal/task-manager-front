import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Profile, Register } from "./Pages/index";
import { useState } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ContentLayout from "./Layout/ContentLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path=""
          element={
            <ContentLayout
              showModal={showModal}
              setShowModal={setShowModal}
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
            />
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home
                  showModal={showModal}
                  setShowModal={setShowModal}
                  showUpdateModal={showUpdateModal}
                  setShowUpdateModal={setShowUpdateModal}
                />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
