import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, wrapper } from "../redux/store";
import { currentUser, reset } from "../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { GrAdd } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLogout, HiMenu } from "react-icons/hi";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

type Props = {
  searchTerm: string;
};

const Navbar = ({ searchTerm }: Props) => {
  const [searchValue, setSearchValue] = useState(searchTerm ? searchTerm : "");
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const menuRef = useRef<any>(null);
  const searchRef = useRef<any>(null);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const handelLogout = () => {
    signOut();
  };

  const handleUploadRequired = () => {
    toast.warning("Login first to upload videos");
  };

  // On click outside
  useEffect(() => {
    function handleMenuClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    function handleSearchClickOutside(event: any) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleMenuClickOutside);
    document.addEventListener("mousedown", handleSearchClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleMenuClickOutside);
      document.removeEventListener("mousedown", handleSearchClickOutside);
    };
  }, [menuRef, searchRef]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full z-10 fixed bg-white flex justify-between items-center md:gap-0 gap-3 py-2 xl:px-28 md:px-10 px-2 border-b-2 border-gray-200">
      <div className="w-[100px] md:w-[130px]">
        <Link href="/">
          <a
            className="text-[1.5rem] font-bold"
            style={{ textShadow: "red -2px 0, cyan 2px 0" }}
          >
            Videoliy
          </a>
        </Link>
      </div>

      <div className="hidden md:block">
        <form onSubmit={handleSearch}>
          <div
            className={` ${
              onFocusSearch
                ? "flex items-center bg-gray-100 rounded-[4rem] border border-gray-300 mx-4"
                : "flex items-center bg-gray-100 rounded-[4rem] border border-gray-100 mx-4"
            }`}
          >
            <input
              onFocus={() => setOnFocusSearch(true)}
              onBlur={() => setOnFocusSearch(false)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search accounts and videos"
              className="bg-transparent outline-none text-sm md:w-[350px] w-[250px] px-4"
            />
            <button
              onClick={handleSearch}
              className="cursor-pointer hover:bg-dark/5 w-14 h-11 flex justify-center items-center rounded-r-[4rem] "
            >
              <FiSearch className="text-gray-400 border-l border-gray-300 w-full h-7 p-1" />
            </button>
          </div>
        </form>
      </div>

      <div className="hidden xl:block">
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/me">
              <a className="bg-gray-100 hover:bg-gray-200 duration-200 ease-in flex items-center gap-2 py-1 px-3">
                <p className="font-semibold text-gray-800">{user.userName}</p>
                <img
                  width="32"
                  className="rounded-full"
                  alt={user.userName}
                  src={
                    user?.image?.url
                      ? user?.image?.url
                      : "/assets/default_profile.png"
                  }
                />
              </a>
            </Link>

            <div className="flex gap-3 items-center">
              <Link href="/upload">
                <a className="btn-light btn-light-primary flex items-center gap-2">
                  <GrAdd />
                  Upload
                </a>
              </Link>
              <Link href="/">
                <a
                  className="btn-light btn-light-primary py-3"
                  onClick={handelLogout}
                >
                  <HiOutlineLogout />
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <button
              className="btn-light btn-light-primary flex items-center gap-2"
              onClick={handleUploadRequired}
            >
              <GrAdd />
              Upload
            </button>
            <Link href="/login">
              <button className="btn btn-primary px-6">Login</button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <FiSearch
          onClick={() => setShowSearch(!showSearch)}
          className="block md:hidden bg-gray-100 p-2 rounded-full text-dark w-8 h-8 z-50"
        />
        <HiMenu
          onClick={() => setShowMenu(!showMenu)}
          className="block xl:hidden bg-gray-100 p-2 rounded-full text-dark w-8 h-8 z-50"
        />
      </div>

      {/* Responsive menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className=" bg-white custome-shadow absolute top-14 md:right-10 right-3 p-4 rounded-md block xl:hidden z-10"
        >
          {user ? (
            <div className="flex flex-col gap-3">
              <Link href="/me">
                <a className="bg-gray-100 hover:bg-gray-200 duration-200 ease-in flex items-center gap-2 py-1 px-3">
                  <p className="font-semibold text-gray-800">{user.userName}</p>
                  <img
                    width="32"
                    className="rounded-full"
                    alt={user.userName}
                    src={
                      user?.image?.url
                        ? user?.image?.url
                        : "/assets/default_profile.png"
                    }
                  />
                </a>
              </Link>

              <div className="flex gap-3 flex-col">
                <Link href="/upload">
                  <a className="btn-light btn-light-primary flex items-center gap-2">
                    <GrAdd />
                    Upload
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className="btn-light btn-light-primary flex items-center gap-2"
                    onClick={handelLogout}
                  >
                    <HiOutlineLogout />
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 flex-col">
              <button
                className="btn-light btn-light-primary flex items-center gap-2"
                onClick={handleUploadRequired}
              >
                <GrAdd />
                Upload
              </button>
              <Link href="/login">
                <button className="btn btn-primary px-6">Login</button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Responsive search */}
      {showSearch && (
        <div
          ref={searchRef}
          className=" bg-white custome-shadow absolute top-14 md:right-10 right-3 p-3 ml-3 rounded-md block md:hidden z-10"
        >
          <div
            className={` ${
              onFocusSearch
                ? "flex items-center bg-gray-100 rounded-[4rem] border border-gray-300"
                : "flex items-center bg-gray-100 rounded-[4rem] border border-gray-100"
            }`}
          >
            <input
              onFocus={() => setOnFocusSearch(true)}
              onBlur={() => setOnFocusSearch(false)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search accounts and videos"
              className="bg-transparent outline-none text-sm w-full px-4"
            />
            <div className="cursor-pointer hover:bg-dark/5 w-14 h-11 flex justify-center items-center rounded-r-[4rem] ">
              <FiSearch className="text-gray-400 border-l border-gray-300 w-full h-7 p-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
