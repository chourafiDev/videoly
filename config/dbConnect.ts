import mongoose from "mongoose";

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = process.env.DB_CONNECTION_ATLAS;

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(MONGO_URL, {
      // MONGO_OPTIONS,
    })
    .then((conn) => console.log(`✔️ [MonogDb]: MongoDb Success Connected`))
    .catch((error) =>
      console.log(error.message, "Failed to connect to database")
    );
};

export default dbConnect;
