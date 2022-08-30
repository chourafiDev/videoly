import { addComment } from "../../../controller/commentController";
import dbConnect from "../../../config/dbConnect";
import { isAuthenticatedUser } from "../../../middleware/authMiddleware";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.use(isAuthenticatedUser).post(addComment);

export default handler;
