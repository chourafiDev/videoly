import axios from "axios";
import { IUser } from "../../../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const register = async (userData: IUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData,
    config
  );

  return response.data;
};

const authServices = { register };

export default authServices;
