import { allPosts, addPost } from "../../../controller/postController";
import dbConnect from "../../../config/dbConnect";
import { isAuthenticatedUser } from "../../../middleware/authMiddleware";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.get(allPosts);
handler.use(isAuthenticatedUser).post(addPost);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default handler;
