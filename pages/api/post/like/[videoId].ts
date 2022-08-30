import { likeVideo } from "../../../../controller/postController";
import dbConnect from "../../../../config/dbConnect";
import nc from "next-connect";
import { isAuthenticatedUser } from "../../../../middleware/authMiddleware";

dbConnect();

const handler = nc();

handler.use(isAuthenticatedUser).patch(likeVideo);

export default handler;
