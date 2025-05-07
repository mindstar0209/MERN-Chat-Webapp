import express from "express";
import {
  getMessage,
  getUnreadCount,
  markMessagesAsRead,
  sendMessage,
} from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);
router.get("/unread", secureRoute, getUnreadCount);
router.put("/read/:id", secureRoute, markMessagesAsRead);

export default router;
