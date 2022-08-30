import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";

interface IProps {
  user: IUser;
}

const SearchUser = ({ user }: IProps) => {
  return (
    <Link href={`/${user.userName}`}>
      <a>
        <div className="flex gap-4 border-b border-gray-300 py-5">
          <img
            alt={user.userName}
            className="w-12 rounded-full"
            src={
              user?.image?.url ? user?.image.url : "/assets/default_profile.png"
            }
          />
          <div>
            <p className="font-bold text-[17px] text-dark flex gap-2 items-center">
              {user.userName} <GoVerified className="text-blue-400" />
            </p>
            <p className="text-gray-600">{user.name}</p>
            <p className="text-gray-600">{user.bio && user.bio}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SearchUser;
