import { allUsers } from "../../../controller/usersController";
import dbConnect from "../../../config/dbConnect";
import { isAuthenticatedUser } from "../../../middleware/authMiddleware";
import nc from "next-connect";

dbConnect();

const handler = nc();

handler.use(isAuthenticatedUser).get(allUsers);

export default handler;
