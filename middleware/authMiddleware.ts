import catchAsyncError from "./catchAsynError";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import ErrorHandler from "../utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../types";

//MIDDLEWARE AUTHENTICATION
const isAuthenticatedUser = catchAsyncError(
  async (req: any, res: NextApiResponse, next: any) => {
    // ===> In the api [...nextauth].js we have the current user that stock in the session (session.user = user.user)
    // ===> getSession (current session) gets auth-token from req.headers
    const session = await getSession({ req });

    if (!session) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }

    req.user = session.user;

    next();
  }
);

export { isAuthenticatedUser };
