import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // createdAt & updatedAt

const User = mongoose.model("User", userSchema);
export default User;
