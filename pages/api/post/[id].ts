import { getPost } from "../../../controller/postController";
import dbConnect from "../../../config/dbConnect";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.get(getPost);

export default handler;
