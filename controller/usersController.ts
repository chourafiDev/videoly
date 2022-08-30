import type { NextApiRequest, NextApiResponse } from "next";
import catchAsynError from "../middleware/catchAsynError";
import User from "../model/User";

export const allUsers = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const currentUser = req.user._id;
    const users = await User.find({ _id: { $ne: currentUser } });
    res.status(200).json({
      success: true,
      data: users,
    });
  }
);

export const getUser = catchAsynError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const userName = req.query.username;
    const user = await User.findOne({ userName }).populate({
      path: "posts",
      strictPopulate: false,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
