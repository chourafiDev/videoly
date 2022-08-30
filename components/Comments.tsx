import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { IComment } from "../types";
import { GoVerified } from "react-icons/go";

interface IProps {
  comment: IComment;
}

const Comments = ({ comment }: IProps) => {
  return (
    <>
      {comment && comment.userId && (
        <div className="flex gap-4 p-2">
          <Link href={`/${comment.userId._id}`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12">
                <Image
                  width={48}
                  height={48}
                  className="rounded-full cursor-pointer"
                  src={
                    comment.userId?.image?.url
                      ? comment.userId?.image?.url
                      : "/assets/default_profile.png"
                  }
                  alt="user-profile"
                  layout="responsive"
                />
              </div>
            </div>
          </Link>
          <div>
            <p className="flex cursor-pointer gap-1 items-center text-[16px] font-bold leading-6 text-dark">
              {comment.userId.userName} <GoVerified className="text-blue-400" />
            </p>
            <p className="text-[14px] text-gray-800">{comment.desc}</p>
            <p className="mt-2 text-[13px] text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
