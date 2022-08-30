import axios from "axios";
import { IPost } from "../../../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getPosts = async () => {
  const response = await axios.get(`${API_URL}/post`);

  return response.data;
};

const getPublicPosts = async () => {
  const response = await axios.get(`${API_URL}/post/public-posts`);

  return response.data;
};

const getPrivatePosts = async () => {
  const response = await axios.get(`${API_URL}/post/private-posts`);

  return response.data;
};

const createPost = async (postData: IPost) => {
  const response = await axios.post(`${API_URL}/post`, postData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const getPost = async (id: string) => {
  const response = await axios.get(`${API_URL}/post/${id}`);

  return response.data;
};

const likeVideo = async (videoId: string) => {
  const response = await axios.patch(`${API_URL}/post/like/${videoId}`);

  return response.data;
};

const unlikeVideo = async (videoId: string) => {
  const response = await axios.patch(`${API_URL}/post/unlike/${videoId}`);

  return response.data;
};

const searchPosts = async (searchValue: string) => {
  const response = await axios.get(`${API_URL}/post/search/${searchValue}`);

  return response.data;
};

const postServices = {
  getPosts,
  getPublicPosts,
  getPrivatePosts,
  createPost,
  getPost,
  likeVideo,
  unlikeVideo,
  searchPosts,
};

export default postServices;
