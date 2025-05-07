import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "User already registered"
            : "Username already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          fullname: newUser.fullname,
          email: newUser.email,
          profileImage: newUser.profileImage,
          gender: newUser.gender,
          country: newUser.country,
          birthday: newUser.birthday,
          summary: newUser.summary,
          hobbies: newUser.hobbies,
          occupation: newUser.occupation,
          nation: newUser.nation,
          isActivated: false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        occupation: user.occupation,
        profileImage: user.profileImage,
        gender: user.gender,
        country: user.country,
        nation: user.nation,
        birthday: user.birthday,
        summary: user.summary,
        hobbies: user.hobbies,
        isActivated: user.isActivated,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
      isActivated: true,
    }).select(
      "fullname username birthday country summary profileImage gender isActivated"
    );
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("req:", req.body);
    const userId = req.user._id;
    const allowedFields = [
      "fullname",
      "profileImage",
      "gender",
      "nation",
      "occupation",
      "country",
      "summary",
      "hobbies",
      "birthday",
    ];

    const updateObj = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateObj[field] = req.body[field];
      }
    });

    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Check if all required fields are present in the update
    const requiredFields = [
      "fullname",
      "gender",
      "nation",
      "country",
      "birthday",
    ];
    const hasAllRequiredFields = requiredFields.every(
      (field) => req.body[field] !== undefined
    );
    if (hasAllRequiredFields) {
      updateObj.isActivated = true;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObj },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password -email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
