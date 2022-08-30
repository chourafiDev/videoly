import type { NextApiRequest, NextApiResponse } from "next";
import catchAsynError from "../middleware/catchAsynError";
import Comment from "../model/Comment";

//@Desc: Get all comments
//@Method: GET: api/comment
//@type: Public
export const allComments = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const postId = req.query.postId;

    const comments = await Comment.find({ postId }).populate({
      path: "userId",
      select: "userName image -_id",
    });

    res.status(200).json({
      success: true,
      data: comments,
    });
  }
);

//@Desc: Add comment
//@Method: POST: api/comment
//@type: Private
export const addComment = catchAsynError(
  async (req: any, res: NextApiResponse) => {
    const userId = req.user._id;
    const { desc, postId } = req.body;

    const newComment = new Comment({
      userId,
      postId,
      desc,
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  }
);
