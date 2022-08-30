import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
//Redux
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import Router from "next/router";

import ButttonLoader from "../components/Utils/ButttonLoader";
import Link from "next/link";
import Head from "next/head";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  //handle inputs changed
  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle login
  const submitLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      Router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-auth">
      <Head>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <form onSubmit={submitLoginHandler} className="custome-shadow card">
          <div className="text-center mb-8">
            <h1 className="font-bold text-dark/90 text-2xl mb-2">Sign In</h1>
            <p className="text-[13px] text-gray-500 px-10">
              Keep sign in to add videos and get more features
            </p>
          </div>

          <div className="flex flex-col justify-center space-y-3 mt-5 mb-1">
            <input
              type="email"
              className="input-outline"
              value={email}
              name="email"
              onChange={handleInputsChange}
              placeholder="Enter email address"
            />
            <input
              type="password"
              className="input-outline"
              value={password}
              name="password"
              onChange={handleInputsChange}
              placeholder="Enter password"
            />
          </div>
          <button className="btn btn-primary mt-5 mb-4" disabled={loading}>
            {loading ? <ButttonLoader text="Login" /> : "Login"}
          </button>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/registre">
              <a className="text-primary cursor-pointer font-semibold">
                Sign up
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
