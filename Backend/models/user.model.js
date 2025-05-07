import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    occupation: {
      type: String,
    },
    country: {
      type: String,
    },
    nation: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    summary: {
      type: String,
      default: "",
    },
    hobbies: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // createdAt & updatedAt

const User = mongoose.model("User", userSchema);
export default User;
