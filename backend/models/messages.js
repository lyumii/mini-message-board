import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);
