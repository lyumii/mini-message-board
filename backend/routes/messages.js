import express from "express";
import { Message } from "../models/messages.js";
import mongoose from "mongoose";

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
  try {
    const messageId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "Invalid message ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(messageId);
    const deletedMessage = await Message.findByIdAndDelete(objectId);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("❌ ERROR: Failed to delete message:", err);
    res.status(500).json({ error: `Failed to delete message: ${err.message}` });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: `invalid msg id format` });
    }

    const objectId = new mongoose.Types.ObjectId(messageId);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: `Msg content missing` });
    }
    const editedMsg = await Message.findByIdAndUpdate(
      objectId,
      { text },
      { new: true }
    );

    if (!editedMsg) {
      return res.status(404).json({ error: `msg not found` });
    }
    res.json({ success: true, message: `msg edited` });
  } catch (err) {
    console.error(`failed to edit`, err);
    res.status(500).json({ error: `failed to edit msg: ${err.message}` });
  }
});

export default router;
