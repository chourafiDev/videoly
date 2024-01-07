import { useRouter } from "next/router";
import React, { useEffect, useRef, Fragment, useState } from "react";
import { getUser } from "../redux/features/user/userSlice";
import Head from "next/head";
import Sidebar from "../components/Sidebar/Sidebar";
import { Tab } from "@headlessui/react";
import SmallVideo from "../components/Video/SmallVideo";
import NoResults from "../components/NoResults";
import { toast } from "react-toastify";
import DotLoader from "react-spinners/DotLoader";
import Layout from "../components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const [fullName, setFullName] = useState<string>("");
  const router = useRouter();
  const queryParam = router.query.username;

  const dispatch = useDispatch<AppDispatch>();
  const { user, messageSuccess, isError, isLoading, messageError } =
    useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUser(queryParam as string));
  }, [dispatch, queryParam]);

  useEffect(() => {
    if (user) {
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

  return (
    <div>
      <>
        <Head>
          <title>Videoly | @{fullName}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Layout searchValue="">
          <div className="flex gap-0 md:gap-20 xl:mx-24">
            <Sidebar />
            <div className="ml-auto lg:w-[65%] w-full mt-20 lg:pr-0 pl-4 md:pl-0 md:pr-8 pr-4">
              {!isLoading ? (
                user ? (
                  <>
                    <div className="flex md:flex-row flex-col  items-center gap-6">
                      <img
                        alt={fullName}
                        className="w-20 rounded-full"
                        src={
                          user?.image?.url
                            ? user?.image.url
                            : "/assets/default_profile.png"
                        }
                      />

                      <div className="w-full flex justify-between">
                        <div>
                          <h2 className="md:text-[22px] text-[18px] font-bold text-dark">
                            {user?.userName}
                          </h2>
                          <h3 className="md:text-sm text-[14px] font-semibold text-dark/80">
                            {fullName}
                          </h3>
                        </div>

                        <button className="btn btn-primary w-28 md:h-10 h-8 p-0 rounded-[5px]">
                          Follow
                        </button>
                      </div>
                    </div>

                    <div className="flex md:gap-10 gap-4 mt-10">
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
                            Videos
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
                            Likes
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-8">
                          <Tab.Panel>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                              {user?.posts && user?.posts.length > 0 ? (
                                user?.posts.map((post) => (
                                  <SmallVideo key={post._id} post={post} />
                                ))
                              ) : (
                                <NoResults />
                              )}
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className="flex gap-4">
                              <NoResults />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </>
                ) : (
                  <div>
                    <NoResults />
                  </div>
                )
              ) : (
                <div className="sweet-loading flex items-center justify-center h-[300px]">
                  <DotLoader color="#FE2C55" loading={isLoading} size={40} />
                </div>
              )}
            </div>
          </div>
        </Layout>
      </>
    </div>
  );
};

export default Profile;
