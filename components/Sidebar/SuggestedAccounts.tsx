import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsers } from "../../redux/features/user/userSlice";
import Link from "next/link";

const SuggestedAccounts = () => {
  const [showProfile, setShowPorfile] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isError, messageError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="xl:border-b xl:border-gray-200 pb-6 pt-2 xl:pt-0">
      <p className="text-dark/50 text-sm my-4 hidden xl:block">
        Suggested accounts
      </p>
      <div className="">
        <ul className="w-full mx-auto">
          {users &&
            users.map((user) => (
              <li key={user._id} className="relative">
                <Link href={`/${user.userName}`}>
                  <a
                    className="flex items-end gap-5 p-2 hover:bg-gray-50 duration-300 ease-linear"
                    onMouseEnter={() => setShowPorfile(user?._id)}
                    onMouseLeave={() => setShowPorfile("")}
                  >
                    <img
                      alt={user.userName}
                      src={
                        user?.image?.url
                          ? user?.image?.url
                          : "/assets/default_profile.png"
                      }
                      className="rounded-full w-10"
                    />
                    <div className="hidden xl:block">
                      <p className="font-bold text-[15px]">{user.userName}</p>
                      <p className="text-gray-600 text-sm">{user.name}</p>
                    </div>
                  </a>
                </Link>

                <div
                  className="w-full bg-white custome-shadow p-4 rounded-[10px] absolute top-13 right-0 z-20 hidden xl:block"
                  style={{
                    opacity: showProfile !== user._id ? "0" : "1",
                    visibility: showProfile !== user._id ? "hidden" : "visible",
                    transition: "all .5s",
                  }}
                  onMouseEnter={() => setShowPorfile(user?._id)}
                  onMouseLeave={() => setShowPorfile("")}
                >
                  <div className="flex justify-between items-center mb-3">
                    <img
                      alt={user.userName}
                      src={
                        user?.image?.url
                          ? user?.image?.url
                          : "/assets/default_profile.png"
                      }
                      className="rounded-full w-10"
                    />
                    <button className="btn btn-primary w-24 py-1">
                      Follow
                    </button>
                  </div>
                  <Link href={`/${user.userName}`}>
                    <a>
                      <h3 className="font-bold text-dark text-md mb-1">
                        {user.userName}
                      </h3>
                      <h5 className="text-sm text-gray-800 font-medium">
                        {user.name}
                      </h5>
                    </a>
                  </Link>

                  <div className="flex gap-5 mt-2">
                    <p>
                      <strong>2.5M</strong> Followers
                    </p>
                    <p>
                      <strong>10M</strong> Likes
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestedAccounts;
