import { allComments } from "../../../controller/commentController";
import dbConnect from "../../../config/dbConnect";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.get(allComments);

export default handler;
