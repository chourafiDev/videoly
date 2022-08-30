import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import ButttonLoader from "./Utils/ButttonLoader";
import { IUser } from "../types";
//Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { currentUser } from "../redux/features/user/userSlice";
import { register } from "../redux/features/auth/authSlice";

type TProps = {
  classProps: string;
};

const Auth = ({ classProps }: TProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
  });

  const { userName, name, email, password } = formData;

  const dispatch = useDispatch<AppDispatch>();
  const {
    currentUser: user,
    isLoading,
    isSuccess,
    isError,
    messageError,
  } = useSelector((state: RootState) => state.user);

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function closeModalRegister() {
    setIsOpenRegister(false);
  }

  function openModalRegister() {
    setIsOpenRegister(true);
  }

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    if (isSuccess) {
      toast.success("Register success");
      closeModalLogin();
      closeModalRegister();
    }

    if (user) {
      dispatch(currentUser());
    }
  }, [isError, isSuccess, messageError, dispatch, user]);

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
      toast.success("login success");
      closeModalLogin();
      closeModalRegister();
      dispatch(currentUser());
    }
  };

  //handle registre
  const submitRegisterHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData: IUser = { userName, email, password, name };
    console.log("userData", userData);
    dispatch(register(userData));

    setLoading(false);
  };

  return (
    <div>
      <button className={classProps} onClick={openModalLogin}>
        Login
      </button>

      {/* Modal login */}
      <Transition appear show={isOpenLogin} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalLogin}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[35rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Sign In
                  </Dialog.Title>

                  <form onSubmit={submitLoginHandler} className="w-full ">
                    <div className="flex flex-col justify-center space-y-2 mt-5">
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
                    <button
                      className="btn btn-primary mt-5 mb-4"
                      disabled={loading}
                    >
                      {loading ? <ButttonLoader text="Login" /> : "Login"}
                    </button>
                    <p className="text-center">
                      Don’t have an account?{" "}
                      <span
                        className="text-primary cursor-pointer font-semibold"
                        onClick={() => {
                          closeModalLogin();
                          openModalRegister();
                        }}
                      >
                        Sign up
                      </span>
                    </p>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal Regsiter */}
      <Transition appear show={isOpenRegister} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalRegister}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[35rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Sign Up
                  </Dialog.Title>

                  <form onSubmit={submitRegisterHandler} className="w-full ">
                    <div className="flex flex-col justify-center space-y-2 mt-5">
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
                    <button
                      className="btn btn-primary mt-5 mb-4"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ButttonLoader text="Regsiter" />
                      ) : (
                        "Regsiter"
                      )}
                    </button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <span
                        className="text-primary cursor-pointer font-semibold"
                        onClick={() => {
                          openModalLogin();
                          closeModalRegister();
                        }}
                      >
                        Log in
                      </span>
                    </p>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Auth;
