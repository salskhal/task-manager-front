import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUserInfo } from "../../redux/authSlice";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => ({ ...state }));

  const { currentUser } = auth;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(removeUserInfo());
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <nav className="flex  gap-5 justify-between md:items-center flex-col md:flex-row p-5 md:px-10 py-5 w-full">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-white">Task Manager</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <button
              className="bg-indigo-600 py-3 px-5 rounded-lg text-white text-lg"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Add Task
            </button>
          </div>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center px-2 py-1 gap-5 mr-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800">
                    <p className="text-white font-bold text-xl">
                      {currentUser && currentUser.name[0]
                        ? currentUser.name[0]
                        : "U"}
                      
                    </p>
                  </div>
                  <div className="flex flex-col justify-center text-gray-600 font-semibold mt-1">
                    <span className="text-white font-bold text-xl">
                      {currentUser && currentUser.name}
                    </span>
                  </div>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <p
                    onClick={(e) => handleClick(e)}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                  >
                    Sign out
                  </p>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default Header;
