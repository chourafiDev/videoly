import axios from "axios";
import { IComment } from "../../../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getComments = async (postId: string | string[] | undefined) => {
  const response = await axios.get(`${API_URL}/comment/${postId}`);

  return response.data;
};

const addComment = async (commentData: IComment) => {
  const response = await axios.post(`${API_URL}/comment`, commentData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const commentServices = {
  getComments,
  addComment,
};

export default commentServices;
