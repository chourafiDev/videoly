import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IUser } from "../types";
//Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { register } from "../redux/features/auth/authSlice";

import ButttonLoader from "../components/Utils/ButttonLoader";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";

const Registre = () => {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
  });

  const { userName, name, email, password } = formData;

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isSuccess, isError, messageError } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    if (isSuccess) {
      Router.push("/");
    }
  }, [isError, isSuccess, messageError]);

  //handle inputs changed
  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle registre
  const submitRegisterHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: IUser = { userName, email, password, name };
    console.log("userData", userData);
    dispatch(register(userData));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-auth">
      <Head>
        <title>Sign Up</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <form onSubmit={submitRegisterHandler} className="custome-shadow card">
          <div className="text-center mb-8">
            <h1 className="font-bold text-dark/90 text-2xl mb-2">Sign Up In</h1>
            <p className="text-[13px] text-gray-500 px-10">
              Keep sign up to add videos and get more features
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-3 mt-5 mb-1">
            <input
              type="text"
              className="input-outline"
              value={userName}
              name="userName"
              onChange={handleInputsChange}
              placeholder="Username"
            />
            <input
              type="text"
              className="input-outline"
              value={name}
              name="name"
              onChange={handleInputsChange}
              placeholder="Name"
            />
            <input
              type="email"
              className="input-outline"
              value={email}
              name="email"
              onChange={handleInputsChange}
              placeholder="Email address"
            />
            <input
              type="password"
              className="input-outline"
              value={password}
              name="password"
              onChange={handleInputsChange}
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary mt-5 mb-4" disabled={isLoading}>
            {isLoading ? <ButttonLoader text="Sign Up" /> : "Sign Up"}
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-primary cursor-pointer font-semibold">
                Sign In
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registre;
