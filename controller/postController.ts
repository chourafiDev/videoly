import type { NextApiRequest, NextApiResponse } from "next";
import catchAsynError from "../middleware/catchAsynError";
import Post from "../model/Post";
import User from "../model/User";

//@Desc: Get all posts
//@Method: GET: api/post
//@type: Public
export const allPosts = catchAsynError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const posts = await Post.find({ publish: "public" })
      // .populate({
      //   path: "userId",
      //   select: "userName image -_id",
      // })
      .populate({
        path: "comments",
        strictPopulate: false,
      });

    res.status(200).json({
      success: true,
      data: posts,
    });
  }
);

//@Desc: Get Public posts of user
//@Method: GET: api/post/public-posts
//@type: Private
export const publicPosts = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const posts = await Post.find({
      userId: req.user._id,
      publish: "public",
    });

    res.status(200).json({
      success: true,
      data: posts,
    });
  }
);

//@Desc: Get Private posts of user
//@Method: GET: api/post/private-posts
//@type: Private
export const privatePosts = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const posts = await Post.find({
      userId: req.user._id,
      publish: "private",
    });

    res.status(200).json({
      success: true,
      data: posts,
    });
  }
);

//@Desc: Create new post
//@Method: POST: api/post
//@type: Private
export const addPost = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const { category, caption, video, publish } = req.body;
    const userId = req.user._id;

    const post = await Post.create({
      userId,
      caption,
      category,
      video,
      publish,
    });

    res.status(200).json({
      success: true,
      data: post,
      message: "Post added successfully",
    });
  }
);

//@Desc: Get post
//@Method: GET: api/post/[id]
//@type: Public
export const getPost = catchAsynError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const videoId = req.query.id;

    const post = await Post.findById(videoId).populate({
      path: "userId",
      select: "userName image -_id",
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

//@Desc: Like video
//@Method: PUT: api/post/like-post/[videoId]
//@type: Pivate
export const likeVideo = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const videoId = req.query.videoId;
    const currentUser = req.user._id;

    const user = await User.findById(currentUser);

    await Post.findByIdAndUpdate(videoId, {
      $push: { likes: currentUser },
    });

    res.status(200).json({ user: user._id });
  }
);

//@Desc: Unlike video
//@Method: PUT: api/post/unlike-post/[videoId]
//@type: Pivate
export const unlikeVideo = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const videoId = req.query.videoId;
    const currentUser = req.user._id;

    const user = await User.findById(currentUser);

    await Post.findByIdAndUpdate(videoId, {
      $pull: { likes: currentUser },
    });

    res.status(200).json({ user: user._id });
  }
);

//@Desc: Search for post
//@Method: GET: api/post/search/[searchTerm]
//@type: Public
export const searchPost = catchAsynError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const searchTerm = req.query.searchTerm;
    console.log("searchTerm", searchTerm);
    const posts = await Post.find({
      publish: "public",
      $text: { $search: searchTerm } as any,
    }).populate({
      path: "userId",
      select: "userName image -_id",
    });

    const users = await User.find({ $text: { $search: searchTerm } as any });

    res.status(200).json({
      success: true,
      data: {
        posts,
        users,
      },
    });
  }
);
