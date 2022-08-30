import { getUser } from "../../../controller/usersController";
import dbConnect from "../../../config/dbConnect";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.get(getUser);

export default handler;
