import express from "express";
import secureRoute from "../middleware/secureRoute.js";
import { chatUsers } from "../controller/conversation.controller.js";

const router = express.Router();

router.get("/users", secureRoute, chatUsers);

export default router;
