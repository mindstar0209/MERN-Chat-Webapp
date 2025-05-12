import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const chatUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find conversations where user is a member and sort by updatedAt
    const conversations = await Conversation.find({
      members: userId,
      updatedAt: { $exists: true }, // Ensure updatedAt field exists
    })
      .sort({ updatedAt: -1 }) // Sort by most recent first
      .populate("members");

    // Get the other user from each conversation with unread count
    const users = await Promise.all(
      conversations.map(async (conv) => {
        const otherUser = conv.members.find((m) => m._id.toString() !== userId);
        if (otherUser) {
          // Get unread message count for this conversation
          const unreadCount = await Message.countDocuments({
            conversationId: conv._id,
            receiverId: userId,
            read: false,
          });

          const { password, email, ...userWithoutSensitiveData } =
            otherUser.toObject();
          return {
            ...userWithoutSensitiveData,
            unreadCount,
          };
        }
        return null;
      })
    );

    const filteredUsers = users.filter(Boolean);
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
