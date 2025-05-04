import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.put("/profile", secureRoute, updateProfile)

export default router;
