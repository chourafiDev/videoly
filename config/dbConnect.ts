import mongoose from "mongoose";

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = process.env.DB_CONNECTION_LOCAL;

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(MONGO_URL, {
      // MONGO_OPTIONS,
    })
    .then(() => console.log("connect to database"))
    .catch((error) =>
      console.log(error.message, "Faild to connect to database")
    );
};

export default dbConnect;
