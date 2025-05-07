import Conversation from "../models/conversation.model.js";

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

    // Get the other user from each conversation
    const users = conversations
      .map((conv) => {
        const otherUser = conv.members.find((m) => m._id.toString() !== userId);
        if (otherUser) {
          const { password, email, ...userWithoutSensitiveData } =
            otherUser.toObject();
          return userWithoutSensitiveData;
        }
        return null;
      })
      .filter(Boolean);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
