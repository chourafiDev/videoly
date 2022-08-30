import { GetServerSideProps } from "next";
import React, { useState } from "react";
import NoResults from "../../components/NoResults";
import { IPost, IUser, ISearchData } from "../../types";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import Head from "next/head";
import { searchPosts, reset } from "../../redux/features/post/postSilce";
import type { AppDispatch } from "../../redux/store";
import { Transition } from "@headlessui/react";
import Layout from "../../components/Layout";
import { wrapper } from "../../redux/store";
import SearchVideo from "../../components/Video/searchVideo";
import SearchUser from "../../components/searchUser";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IProps {
  data: ISearchData;
  searchValue: string;
}

const Search = ({ data, searchValue }: IProps) => {
  const { posts, users } = data;

  return (
    <>
      <Head>
        <title>Find {searchValue}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout searchValue={searchValue}>
        <div className="flex gap-6 md:gap-20 xl:mx-24">
          <Sidebar />
          <div className="ml-auto lg:w-[65%] w-full mt-20 lg:pr-0 pl-4 md:pl-0 md:pr-8 pr-4">
            <Tab.Group>
              <Tab.List className="flex p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full font-bold py-2.5 text-md leading-5 text-gray-700 outline-none",
                      selected
                        ? "text-dark/60 border-b-2 border-dark/50 outline-none"
                        : "text-dark/30 border-b border-dark/20 outline-none"
                    )
                  }
                >
                  Accounts
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full font-bold py-2.5 text-md leading-5 text-gray-700 outline-none",
                      selected
                        ? "text-dark/60 border-b-2 border-dark/50 outline-none"
                        : "text-dark/30 border-b border-dark/20 outline-none"
                    )
                  }
                >
                  Videos
                </Tab>
              </Tab.List>
              <Tab.Panels className="">
                <Tab.Panel>
                  <div className="flex flex-col gap-10 videos rounded-md h-full px-2 cursor-pointer hover:bg-gray-50 duration-200 ease-linear">
                    {users && users.length > 0 ? (
                      users.map((user: IUser) => (
                        <SearchUser user={user} key={user._id} />
                      ))
                    ) : (
                      <NoResults />
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mt-4">
                    {posts && posts.length > 0 ? (
                      posts.map((post: IPost) => (
                        <SearchVideo post={post} key={post._id} />
                      ))
                    ) : (
                      <NoResults />
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const { searchValue } = params as any;

    const res = await store.dispatch(searchPosts(searchValue));

    return {
      props: { data: res.payload.data, searchValue },
    };
  });

export default Search;
