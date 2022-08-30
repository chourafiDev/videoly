import React, { useState, useEffect } from "react";
import Link from "next/link";

//Icons
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";

//Components
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";

//Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { currentUser, reset } from "../../redux/features/user/userSlice";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const normalLink =
    "flex items-center justify-center gap-3 rounded hover:bg-light p-3 xl:justify-start cursor-pointer font-semibold ";

  return (
    <>
      <div
        className="block xl:hidden m-2 ml-4 text-xl cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? (
          <MdOutlineCancel className=" bg-gray-100 p-2 rounded-full text-dark w-8 h-8" />
        ) : (
          <AiOutlineMenu className=" bg-gray-100 p-2 rounded-full text-dark w-8 h-8" />
        )}
      </div>
      {showSidebar && (
        <div className="lg:w-[27%] md:w-[10%] h-[92vh] fixed overflow-hidden xl:hover:overflow-y-auto mt-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0">
          <div className="xl:border-b border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={`text-primary ${normalLink}`}>
                <p className="text-[1.2rem]">
                  <AiFillHome />
                </p>
                <span className="capitalize text-[1.1rem] hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className="text-[1.2rem]">
                  <FiUsers />
                </p>
                <span className="capitalize text-[1.1rem] hidden xl:block">
                  Following
                </span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className="text-[1.2rem]">
                  <RiLiveLine />
                </p>
                <span className="capitalize text-[1.1rem] hidden xl:block">
                  Live
                </span>
              </div>
            </Link>
          </div>

          {!user && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-dark/50 text-sm">
                Log in to follow creators, like videos, and view comments.
              </p>
              <div className="pr-4 mt-5">
                <Link href="/login">
                  <button className="btn-outline btn-outline-primary">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}

          <Discover />

          {user && <SuggestedAccounts />}

          <Footer />
        </div>
      )}
    </>
  );
};

export default Sidebar;
