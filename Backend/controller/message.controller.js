import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      read: false,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ status: "success" });
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      members: userId,
    }).populate("messages");

    const unreadCounts = {};

    conversations.forEach((conv) => {
      const otherUser = conv.members.find(
        (m) => m._id.toString() !== userId.toString()
      );
      if (otherUser) {
        const unreadCount = conv.messages.filter(
          (msg) => msg.receiverId.toString() === userId.toString() && !msg.read
        ).length;
        unreadCounts[otherUser._id] = unreadCount;
      }
    });

    res.status(200).json(unreadCounts);
  } catch (error) {
    console.log("Error in getUnreadCount", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const receiverId = req.user._id;

    await Message.updateMany(
      {
        senderId,
        receiverId,
        read: false,
      },
      {
        read: true,
      }
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("Error in markMessagesAsRead", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
