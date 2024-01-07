import Head from "next/head";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { Tab } from "@headlessui/react";
import { BiX } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import SmallVideo from "../components/Video/SmallVideo";
import NoResults from "../components/NoResults";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ButttonDisabled from "../components/Utils/ButtonDisabled";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, wrapper } from "../redux/store";
import {
  reset,
  getPublicPosts,
  getPrivatePosts,
} from "../redux/features/post/postSilce";
import {
  currentUser,
  reset as resetUpdateProfile,
  updateProfile,
} from "../redux/features/user/userSlice";
import ButttonLoader from "../components/Utils/ButttonLoader";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { Session } from "next-auth";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

const Me = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataIsready, setDataIsready] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [oldImage, setOldImage] = useState("");
  const [imagePrev, setImagePrev] = useState<string>(
    oldImage ? oldImage : "assets/default_profile.png"
  );
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    bio: "",
  });

  const { userName, name, bio } = formData;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const fileRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const {
    currentUser: user,
    isUpdated,
    messageSuccess,
    isError: isErrorUpdate,
    isLoading,
    messageError: messageErrorUpdate,
  } = useSelector((state: RootState) => state.user);

  const { publicPosts, privatePosts } = useSelector(
    (state: RootState) => state.post
  );

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as any);
          setImagePrev(reader.result as any);
        }
      };
      reader.readAsDataURL((e.currentTarget as any).files[0]);
    } else {
      const name = e.currentTarget.name;
      const value = e.currentTarget.value;
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getPublicPosts());
    dispatch(getPrivatePosts());

    if (isErrorUpdate) {
      toast.error(messageErrorUpdate);
    }

    if (isUpdated) {
      toast.success(messageSuccess);
      dispatch(resetUpdateProfile());
      closeModal();
    }
  }, [dispatch, isErrorUpdate, messageErrorUpdate, isUpdated, messageSuccess]);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        name: user.name,
        bio: user.bio,
      });

      setImagePrev(
        user?.image?.url ? user?.image.url : "/assets/default_profile.png"
      );
      setFullName(
        user.name &&
          user.name
            .split(" ")
            .map(
              (el) =>
                el.charAt(0).toLocaleUpperCase() + el.slice(1).toLowerCase()
            )
            .join(" ")
      );
    }
  }, [user]);

  useEffect(() => {
    if (name && userName) {
      setDataIsready(true);
    }
  }, [name, userName]);

  const handleUpdate = () => {
    const userData = {
      userName,
      name,
      bio,
      image,
    };
    dispatch(updateProfile(userData));
  };

  return (
    <>
      <Head>
        <title>Videoly | {fullName}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout searchValue="">
        <div className="flex gap-0 md:gap-20 xl:mx-24">
          <Sidebar />

          <div className="ml-auto lg:w-[65%] w-full mt-20 lg:pr-0 pl-4 md:pl-0 md:pr-8 pr-4">
            <div className="flex items-center gap-10">
              <img
                alt={fullName}
                className="w-20 rounded-full"
                src={
                  user?.image?.url
                    ? user?.image.url
                    : "/assets/default_profile.png"
                }
              />

              <div>
                <h2 className="md:text-[22px] text-[18px] font-bold text-dark">
                  {user?.userName}
                </h2>
                <h3 className="md:text-sm text-[14px] font-semibold text-dark/80">
                  {fullName}
                </h3>
                <button
                  className="btn-light btn-light-primary flex items-center gap-2 mt-4"
                  onClick={openModal}
                >
                  <FiEdit />
                  Edit profile
                </button>
              </div>
            </div>

            <div className="flex md:gap-10 gap-3 mt-10">
              <p className="flex gap-3 text-[14px]">
                <strong>20</strong>
                Following
              </p>
              <p className="flex gap-3 text-[14px]">
                <strong>236</strong>
                Followers
              </p>
              <p className="flex gap-3 text-[14px]">
                <strong>100</strong>
                Likes
              </p>
            </div>

            <div className="mt-5">
              <p>{user?.bio ? user?.bio : ""}</p>{" "}
            </div>

            <div className="w-full max-w-md px-2 mb-16 mt-6 sm:px-0">
              <Tab.Group>
                <Tab.List className="flex  p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full font-bold py-2.5 text-md leading-5 text-gray-700 outline-none",
                        selected
                          ? "text-dark border-b-2 border-dark outline-none"
                          : "text-dark/30 border-b border-dark/20 outline-none"
                      )
                    }
                  >
                    Public videos
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full font-bold py-2.5 text-md leading-5 text-gray-700 outline-none",
                        selected
                          ? "text-dark border-b-2 border-dark outline-none"
                          : "text-dark/30 border-b border-dark/20 outline-none"
                      )
                    }
                  >
                    Private videos
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-8">
                  <Tab.Panel>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {publicPosts && publicPosts.length > 0 ? (
                        publicPosts.map((post) => (
                          <SmallVideo key={post._id} post={post} />
                        ))
                      ) : (
                        <NoResults />
                      )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {privatePosts && privatePosts.length > 0 ? (
                        privatePosts.map((post) => (
                          <SmallVideo key={post._id} post={post} />
                        ))
                      ) : (
                        <NoResults />
                      )}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </Layout>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-[45rem] transform overflow-hidden rounded-xl bg-white  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between items-center px-6 py-5">
                    <p className="text-xl">Edit profile</p>
                    <BiX
                      className="text-2xl cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <hr />

                  <div className="p-6">
                    <div className="flex md:flex-row flex-col items-center md:gap-40 gap-6">
                      <label className="font-semibold text-dark text-[16px]">
                        Profile photo
                      </label>
                      <div>
                        <div className=" relative">
                          <img src={imagePrev} className="w-24 rounded-full" />
                          <AiOutlineEdit
                            onClick={() => {
                              fileRef.current?.click();
                            }}
                            className="absolute text-dark/70 cursor-pointer bottom-0 right-0 p-1 w-8 h-8 bg-white rounded-full border border-dark/30"
                          />
                        </div>
                        <input
                          type="file"
                          name="image"
                          ref={fileRef}
                          className="w-0 h-0"
                          onChange={handelChange}
                        />
                      </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex md:gap-20 gap-0 md:flex-row flex-col justify-between">
                      <label className="font-semibold w-24 mb-2 md:mb-0 text-dark text-[16px]">
                        Username
                      </label>
                      <div className="w-full">
                        <input
                          type="text"
                          placeholder="Username"
                          className="input w-full font-normal"
                          name="userName"
                          value={userName}
                          onChange={handelChange}
                        />
                        <p className="text-[12px] text-dark/70 my-3">
                          www.tiktok.com/@{userName}
                        </p>
                        <p className="text-[12px] text-dark/70">
                          Usernames can only contain letters, numbers,
                          underscores, and periods. Changing your username will
                          also change your profile link.
                        </p>
                      </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex md:gap-20 gap-0 md:flex-row flex-col justify-between ">
                      <label className="font-semibold w-24 mb-2 md:mb-0 text-dark text-[16px]">
                        Name
                      </label>
                      <div className="w-full">
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          className="input w-full font-normal"
                          value={name}
                          onChange={handelChange}
                        />
                      </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex md:gap-20 gap-0 md:flex-row flex-col justify-between">
                      <label className="font-semibold w-24 mb-2 md:mb-0 text-dark text-[16px]">
                        Bio
                      </label>
                      <div className="w-full">
                        <textarea
                          placeholder="Bio"
                          className="input w-full font-normal"
                          value={bio ? bio : ""}
                          name="bio"
                          onChange={(e) => {
                            if (e.target.value.length <= 80) {
                              handelChange(e);
                            } else {
                              e.target.value = e.target.value.slice(0, 2);
                            }
                          }}
                        />
                        <p className="text-[12px] text-dark/70">
                          {bio ? bio.length : "0"}/80
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="flex gap-4 px-6 py-5 w-72 ml-auto">
                    <button
                      className="btn-light btn-light-primary font-normal"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    {dataIsready ? (
                      isLoading ? (
                        <ButttonLoader text="Save" />
                      ) : (
                        <button
                          className="btn btn-primary font-normal"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                      )
                    ) : (
                      <ButttonDisabled text="Save" />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permenant: false,
        },
      };
    }

    return {
      props: { session },
    };
  }
);

export default Me;
