import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      required: [true, "caption is required!"],
      trime: true,
    },
    category: {
      type: String,
      required: [true, "category is required!"],
      enum: [
        "development",
        "comedy",
        "gaming",
        "food",
        "dance",
        "beauty",
        "animals",
        "sports",
      ],
    },
    video: {
      type: String,
      required: [true, "video is required!"],
    },
    publish: {
      type: String,
      required: [true, "publish is required!"],
      enum: ["public", "private"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

//Post caption index
postSchema.index({ caption: "text" });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
