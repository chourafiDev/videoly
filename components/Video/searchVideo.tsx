import { useRef } from "react";
import { IPost } from "../../types";
import moment from "moment";

interface IProps {
  post: IPost;
}

const SearchVideo = ({ post }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="rounded-xl"
      onMouseEnter={() => {
        videoRef?.current?.play();
      }}
      onMouseLeave={() => {
        videoRef?.current?.pause();
      }}
    >
      <div className="relative">
        <video
          src={post.video}
          loop
          ref={videoRef}
          className=" w-full h-[300px] rounded-2xl cursor-pointer bg-gray-100"
        ></video>
      </div>

      <p className="mt-3 text-base font-normal text-dark/80">{post.caption}</p>
      <p className="text-[13px] font-semibold text-gray-600">
        {moment(post.createdAt).fromNow()}
      </p>
      <div className="mt-3 flex gap-3 items-center">
        <img
          alt={post.userId.userName}
          className="w-8 rounded-full"
          src={
            post.userId?.image?.url
              ? post.userId?.image.url
              : "/assets/default_profile.png"
          }
        />
        <p className="text-[14px] text-gray-800">{post.userId.userName}</p>
      </div>
    </div>
  );
};

export default SearchVideo;
