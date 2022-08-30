import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { AiFillMessage } from "react-icons/ai";
import { IPost } from "../../types";
import NoResults from "../../components/NoResults";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import Head from "next/head";
import DotLoader from "react-spinners/DotLoader";

//Redux states
import { wrapper } from "../../redux/store";
import {
  getPost,
  likeVideo,
  unlikeVideo,
} from "../../redux/features/post/postSilce";
import { GetServerSideProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import LikeButton from "../../components/Utils/LikeButton";
import { currentUser } from "../../redux/features/user/userSlice";
import Comments from "../../components/Comments";
import {
  getComments,
  addComment,
  reset,
} from "../../redux/features/comment/commentSlice";
import { BiMessageRoundedDetail } from "react-icons/bi";

interface IProps {
  postDetails: IPost;
}

const Details = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const postId = router.query.id;

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser: user } = useSelector((state: RootState) => state.user);
  const { post: postState } = useSelector((state: RootState) => state.post);
  const { comments, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.comment
  );

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    dispatch(getComments(postId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, postId]);

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getPost(postId));
  }, [dispatch, router, postId]);

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLikeAnUnlike = () => {
    if (postState.likes?.includes(user?._id)) {
      dispatch(unlikeVideo(post._id));
    } else {
      dispatch(likeVideo(post._id));
    }
  };

  const handleAddComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const commentData = {
      postId,
      desc,
    };

    dispatch(addComment(commentData));
    setDesc("");
  };

  if (!post) {
    return (
      <Layout searchValue="">
        <div className="flex justify-center">
          <div className="h-[60%] w-[60%]">
            <NoResults />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Videoly | {post.caption}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
        <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center video-details-bg">
          <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p className="cursor-pointer " onClick={() => router.back()}>
              <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
            </p>
          </div>
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                ref={videoRef}
                onClick={onVideoClick}
                loop
                src={post?.video}
                className=" h-full cursor-pointer"
              ></video>
            </div>

            <div className="absolute top-[45%] left-[40%]  cursor-pointer">
              {!isPlaying && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              )}
            </div>
          </div>
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
              </button>
            )}
          </div>
        </div>
        <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
          <div className="lg:mt-10 mt-6">
            <div className="flex justify-between px-10">
              <Link href={`/${post.userId.userName}`}>
                <div className="flex gap-4 items-center mb-4 bg-white w-full cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={post.userId.image.url}
                  />
                  <div>
                    <div className="text-[18px] font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {post.userId.userName}{" "}
                      <GoVerified className="text-blue-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {" "}
                      {post.userId.userName}
                    </p>
                  </div>
                </div>
              </Link>
              <button className="btn-outline btn-outline-primary w-36 h-8 p-0">
                Follow
              </button>
            </div>

            <div className="px-10">
              <p className=" text-md text-gray-600">{post.caption}</p>
            </div>
            <div className="mt-10 px-10">
              {user && (
                <div className="flex items-center gap-6">
                  <LikeButton
                    post={postState}
                    handleLikeAnUnlike={handleLikeAnUnlike}
                  />
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded-full p-2">
                      <AiFillMessage className="text-xl text-dark" />
                    </div>

                    <p className="text-md font-semibold text-dark/80">
                      {comments.length || 0}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
              <div className="overflow-scroll lg:h-[295px] px-10">
                {!isLoading ? (
                  comments.length > 0 ? (
                    comments.map((comment) => (
                      <Comments key={comment._id} comment={comment} />
                    ))
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full space-y-4">
                      <BiMessageRoundedDetail className="text-[3rem] text-gray-700" />
                      <p className="text-sm text-gray-700">
                        No Comments Yet! Be First to do add the comment.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="sweet-loading flex items-center justify-center h-[300px]">
                    <DotLoader color="#FE2C55" loading={isLoading} size={40} />
                  </div>
                )}
              </div>
              {/* Form add comment */}
              {user && (
                <div className=" bg-white w-full px-10 py-4">
                  <form
                    onSubmit={handleAddComment}
                    className="flex items-center gap-4"
                  >
                    <input
                      value={desc}
                      onChange={(e) => setDesc(e.target.value.trim())}
                      className="bg-gray-100 px-3 py-3 text-sm caret-primary font-sans border w-full border-gray-100 focus:border-1 outline-none focus:border-gray-300 flex-1 rounded-lg"
                      placeholder="Add comment..."
                    />
                    {desc ? (
                      <button
                        className="text-md font-sans text-primary cursor-pointer"
                        onClick={handleAddComment}
                      >
                        {isLoading ? "Posting..." : "Post"}
                      </button>
                    ) : (
                      <p className="text-md font-sans text-gray-400 cursor-no-drop">
                        Post
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const { id } = params as any;

    const res = await store.dispatch(getPost(id));

    return {
      props: { postDetails: res.payload.data },
    };
  });

export default Details;
