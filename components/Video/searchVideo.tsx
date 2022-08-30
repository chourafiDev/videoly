import { useRef } from "react";
import { IPost } from "../../types";
import moment from "moment";

interface IProps {
  post: IPost;
}

const SearchVideo = ({ post }: IProps) => {
  console.log("post", post);
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
          className=" w-[210px] h-[300px] rounded-2xl cursor-pointer bg-gray-100"
        ></video>
        <p className="absolute bottom-0 left-0 p-3 text-[13px] font-bold text-gray-600">
          {moment(post.createdAt).fromNow()}
        </p>
      </div>

      <p className="mt-3 text-sm font-normal text-dark/80">{post.caption}</p>
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
