import axios from "axios";
import { IUserUpdate } from "../../../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getUsers = async () => {
  const response = await axios.get(`${API_URL}/user`);

  return response.data;
};

const getUser = async (userName: string) => {
  const response = await axios.get(`${API_URL}/user/${userName}`);

  return response.data;
};

const currentUser = async () => {
  const response = await axios.get(`${API_URL}/me`);

  return response.data;
};

const updateProfile = async (userData: IUserUpdate) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.put(
    `${API_URL}/auth/update-profile`,
    userData,
    config
  );

  return response.data;
};

const postServices = {
  getUsers,
  getUser,
  updateProfile,
  currentUser,
};

export default postServices;
