import { useRef } from "react";
import { IPost } from "../../types";

interface IProps {
  post: IPost;
}

const SmallVideo = ({ post }: IProps) => {
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
      <video
        src={post.video}
        loop
        ref={videoRef}
        className="w-[210px] h-[300px] rounded-2xl cursor-pointer bg-gray-100"
      ></video>

      <p className="mt-3 text-sm font-normal text-dark/80">{post.caption}</p>
    </div>
  );
};

export default SmallVideo;
