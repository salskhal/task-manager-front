import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { login } from "../redux/authSlice";
import {toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      await dispatch(login({ email, password }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Log into your account
        </h1>
        <p className="text-sm text-gray-500 mt-2">Welcome Back</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="email">Email</label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="John Doe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-5 text-center text-sm text-gray-500">
        Not a member?{" "}
        <Link
          to="/register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Register here
        </Link>
      </p>
    </FormContainer>
  );
};

export default Login;
