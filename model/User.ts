import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required!"],
      validate: [validator.isEmail, "Please enter a valide email address"],
      trim: true,
    },
    bio: {
      type: String,
      default: null,
    },
    image: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    password: {
      type: String,
      required: [true, "Username is required!"],
      minLength: [8, "Password must be longer then 8 characters"],
      select: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.index({ userName: "text" });

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Virtual populate
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id", // Find tour where `localField`
  foreignField: "userId", // is equal to `foreignField`
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
