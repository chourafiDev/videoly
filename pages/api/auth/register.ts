import { register } from "../../../controller/authController";
import dbConnect from "../../../config/dbConnect";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.post(register);

export default handler;
