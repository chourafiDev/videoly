import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { NextPage } from "next";
import { IPost } from "../../types";

interface IProps {
  post: IPost;
  handleLikeAnUnlike: () => void;
}

const LikeButton: NextPage<IProps> = ({ post, handleLikeAnUnlike }) => {
  const { currentUser: user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2 cursor-pointer">
        {post.likes?.includes(user?._id) ? (
          <div
            className="bg-gray-200  rounded-full p-2"
            onClick={handleLikeAnUnlike}
          >
            <MdFavorite className="text-xl text-primary" />
          </div>
        ) : (
          <div
            className="bg-gray-200 rounded-full p-2"
            onClick={handleLikeAnUnlike}
          >
            <MdFavorite className="text-xl text-dark/90" />
          </div>
        )}
        <p className="text-md font-semibold text-dark/80">
          {post.likes?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
