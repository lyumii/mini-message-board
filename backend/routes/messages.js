import express from "express";
import { Message } from "../models/messages.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, text } = req.body;
    const newMessage = new Message({ user, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  console.log("🛠️ DELETE request received for ID:", req.params.id); // Debugging log
  try {
    const messageId = req.params.id;

    console.log("🔎 Received DELETE request for ID:", messageId);

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "Invalid message ID format" });
    }

    const deleteMsg = await Message.findByIdAndDelete(objectId);

    if (!deleteMsg) {
      return res.status(404).json({ error: `Msg not found` });
    }
    res.json({ success: true, message: `Msg deleted` });
  } catch (error) {
    res.status(500).json({ error: `failed to delete msg` });
  }
});

export default router;
