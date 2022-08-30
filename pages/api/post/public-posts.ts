import { publicPosts } from "../../../controller/postController";
import dbConnect from "../../../config/dbConnect";
import { isAuthenticatedUser } from "../../../middleware/authMiddleware";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.use(isAuthenticatedUser).get(publicPosts);

export default handler;
