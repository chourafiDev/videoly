import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsWhatsapp,
  BsFacebook,
  BsLink45Deg,
} from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
import { AiFillMessage, AiOutlineTwitter } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { IPost } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getComments } from "../../redux/features/comment/commentSlice";
import { getPost } from "../../redux/features/post/postSilce";

interface IProps {
  post: IPost;
  postState: IPost;
  handleLikeAnUnlike: (id: string) => void;
}

const Index: NextPage<IProps> = ({ post, postState, handleLikeAnUnlike }) => {
  const [showShare, setShowShare] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const { currentUser: user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPost(post._id));
  //   }
  // }, [dispatch, post]);

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  return (
    <>
      <div className="border-gray-100">
        <Link href={`/${post.userId.userName}`}>
          <a>
            <div className="flex gap-6 pb-2">
              <div className="md:w-14 md:h:14 w-8 h-8">
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  alt="profile"
                  layout="responsive"
                  src={
                    post?.userId?.image?.url
                      ? post?.userId?.image?.url
                      : "/assets/default_profile.png"
                  }
                />
              </div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-dark text-sm">
                    {post.userId?.userName}
                  </p>
                  <p className="font-bold text-dark/40 flex items-center gap-1 text-sm">
                    <GoVerified className="text-blue-400" />{" "}
                    {post.userId?.userName}
                  </p>
                </div>

                <p className="text-[13px] text-gray-800 mt-1">{post.caption}</p>
              </div>
            </div>
          </a>
        </Link>

        {/* Video */}
        <div className="lg:ml-20 flex items-end gap-4 py-6">
          <div
            className="rounded-3xl relative"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            <Link href={`video/${post._id}`}>
              <video
                src={post.video}
                loop
                ref={videoRef}
                className="w-[250px] h-[440px] rounded-2xl cursor-pointer bg-gray-100"
              ></video>
            </Link>
            {isHover && (
              <div className="absolute bottom-5 left-0 flex justify-between w-full  px-5">
                <div>
                  {playing ? (
                    <button
                      onClick={onVideoPress}
                      className="text-dark text-xl lg:text-2xl"
                    >
                      <BsFillPauseFill />
                    </button>
                  ) : (
                    <button
                      onClick={onVideoPress}
                      className="text-dark text-xl lg:text-2xl"
                    >
                      <BsFillPlayFill />
                    </button>
                  )}
                </div>
                <div>
                  {isVideoMuted ? (
                    <button
                      onClick={() => setIsVideoMuted(false)}
                      className="text-dark text-xl lg:text-2xl"
                    >
                      <HiVolumeOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsVideoMuted(true)}
                      className="text-dark text-xl lg:text-2xl"
                    >
                      <HiVolumeUp />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {post.likes?.includes(user?._id) ? (
              <Link href={`/video/${post._id}`}>
                <div className="text-center">
                  <div
                    className="bg-gray-200 hover:bg-gray-300 duration-200 ease-linear rounded-full p-2 cursor-pointer"
                    // onClick={() => handleLikeAnUnlike(post._id)}
                  >
                    <MdFavorite className="text-2xl text-primary" />
                  </div>
                  <p className="text-dark/70 text-sm font-semibold">
                    {post.likes?.length || 0}
                  </p>
                </div>
              </Link>
            ) : (
              <Link href={`/video/${post._id}`}>
                <div className="text-center">
                  <div
                    className="bg-gray-200 hover:bg-gray-300 duration-200 ease-linear rounded-full p-2 cursor-pointer"
                    // onClick={() => handleLikeAnUnlike(post._id)}
                  >
                    <MdFavorite className="text-2xl text-dark/90" />
                  </div>
                  <p className="text-dark/70 text-sm font-semibold">
                    {post.likes?.length || 0}
                  </p>
                </div>
              </Link>
            )}
            <Link href={`/video/${post._id}`}>
              <a className="text-center">
                <div className="bg-gray-200 hover:bg-gray-300 duration-200 ease-linear  rounded-full p-2">
                  <AiFillMessage className="text-2xl text-dark" />
                </div>
              </a>
            </Link>
            <div className="relative">
              <div
                className={`bg-white absolute bottom-12 -left-3 custome-shadow py-2 rounded-md w-[300px] cursor-pointer ${
                  showShare ? "block" : "hidden"
                }`}
                onMouseOver={() => setShowShare(true)}
                onMouseLeave={() => setShowShare(false)}
              >
                <div className="flex items-center hover:bg-gray-100 duration-150 ease-linear py-3 gap-2 w-full cursor-pointer px-4">
                  <BsWhatsapp className="bg-green-500 p-[5px] text-white w-7 h-7 rounded-full" />
                  <p className="text-[15px] font-semibold tracking-wide	">
                    Share to WhatsApp
                  </p>
                </div>
                <div className="flex items-center hover:bg-gray-100 duration-150 ease-linear py-3 gap-2 w-full cursor-pointer px-4">
                  <BsFacebook className=" text-blue-500 w-7 h-7 rounded-full" />
                  <p className="text-[15px] font-semibold tracking-wide	">
                    Share to Facebook
                  </p>
                </div>
                <div className="flex items-center hover:bg-gray-100 duration-150 ease-linear py-3 gap-2 w-full cursor-pointer px-4">
                  <BsLink45Deg className="bg-primary p-[5px] text-white w-7 h-7 rounded-full" />
                  <p className="text-[15px] font-semibold tracking-wide	">
                    Copy link
                  </p>
                </div>
                <div className="flex items-center hover:bg-gray-100 duration-150 ease-linear py-3 gap-2 w-full cursor-pointer px-4">
                  <AiOutlineTwitter className="bg-blue-400 p-[6px] text-white w-7 h-7 rounded-full" />
                  <p className="text-[15px] font-semibold tracking-wide	">
                    Share to Twitter
                  </p>
                </div>
                <div className="bg-white w-4 h-4 rotate-45 translate-x-6 translate-y-4"></div>
              </div>
              <div
                className="bg-gray-200 hover:bg-gray-300 duration-200 ease-linear cursor-pointer rounded-full p-2"
                onMouseOver={() => setShowShare(true)}
                onMouseLeave={() => setShowShare(false)}
              >
                <FaShare className="text-2xl text-dark " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
