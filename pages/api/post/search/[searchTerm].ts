import { searchPost } from "../../../../controller/postController";
import dbConnect from "../../../../config/dbConnect";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.get(searchPost);

export default handler;
