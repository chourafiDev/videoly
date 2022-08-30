import type { NextApiRequest, NextApiResponse } from "next";
import catchAsynError from "../middleware/catchAsynError";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/User";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary";
import { IUserObj } from "../types";

//Register user   =>   Post : api/auth/register
export const register = catchAsynError(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { userName, email, password, name } = req.body;

    if (!userName || !email || !password) {
      return next(new ErrorHandler("Please add all fileds", 400));
    }

    //Check if user exists
    const user = await User.findOne({ userName });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      userName,
      name,
      email,
      password: hash,
    });

    res.status(200).json({
      success: true,
      data: newUser,
      message: "Account Registred Successfully",
    });
  }
);

//Current user   =>   Get : api/me
export const currentUser = catchAsynError(
  async (req: IUserObj, res: NextApiResponse, next: any) => {
    // Check if user exists
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler("User not exists", 400));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const updateProfile = catchAsynError(
  async (req: any, res: NextApiResponse, next: any) => {
    const { userName, name, image, bio } = req.body;
    const userId = req.user._id;

    let userNameList = [];

    const allUsers = await User.find();
    const user = await User.findById(userId);

    allUsers.forEach((user) => {
      if (userName == user.userName) {
        userNameList.push(user.userName);
      }
    });

    if (userNameList.length >= 2) {
      next(new ErrorHandler("Username already exist", 403));
    }

    if (user) {
      user.userName = userName;
      user.name = name;
      user.bio = bio;

      //Check is ther is an image
      if (image !== "") {
        if (user.image.public_id) {
          //Delete previous image
          await cloudinary.uploader.destroy(user.image.public_id);
        }

        //new image
        const result = await cloudinary.uploader.upload(req.body.image, {
          folder: "tiktok_clone/user-images",
          width: "150",
          crop: "scale",
        });

        user.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      user.save();
    } else {
      next(new ErrorHandler("User not exists", 404));
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
    });
  }
);
