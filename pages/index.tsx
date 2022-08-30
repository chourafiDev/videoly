import { GetServerSideProps } from "next";
import Video from "../components/Video";
import NoResults from "../components/NoResults";
import { IPost } from "../types";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import Head from "next/head";
import { getPosts, reset } from "../redux/features/post/postSilce";
import Layout from "../components/Layout";
import { wrapper } from "../redux/store";
import type { RootState, AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { likeVideo, unlikeVideo } from "../redux/features/post/postSilce";
import { useEffect } from "react";

interface IProps {
  posts: IPost[];
}

const Home = ({ posts }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser: user } = useSelector((state: RootState) => state.user);
  const { post: postState, isSuccess } = useSelector(
    (state: RootState) => state.post
  );
  console.log("postState", postState);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, isSuccess]);

  const handleLikeAnUnlike = (id: string) => {
    if (user) {
      if (postState.likes?.includes(user?._id)) {
        dispatch(unlikeVideo(id));
      } else {
        dispatch(likeVideo(id));
      }
    } else {
      toast.warning("Login first to like videos");
    }
  };
  return (
    <>
      <Head>
        <title>Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout searchValue="">
        <div className="flex gap-6 md:gap-20 xl:mx-24">
          <Sidebar />
          <div className="ml-auto lg:w-[65%] w-full mt-20 lg:pr-0 pl-4 md:pl-0 md:pr-8 pr-4">
            <div className="flex flex-col gap-10 videos h-full">
              {posts && posts.length > 0 ? (
                posts.map((post: IPost) => (
                  <Video
                    post={post}
                    postState={postState}
                    key={post._id}
                    handleLikeAnUnlike={handleLikeAnUnlike}
                  />
                ))
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const res = await store.dispatch(getPosts());

    return {
      props: { posts: res.payload.data },
    };
  });

export default Home;
