import express from "express";

const router = express.Router();

const messageArray = [
  { user: "Alice", text: "Hello world!" },
  { user: "Bob", text: "Express is cool!" },
];

router.get("/", (req, res) => {
  res.json(messageArray);
});

router.post("/", (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: `User and text are required` });
  }

  const newMessage = { user, text };
  messageArray.push(newMessage);
  res.json(messageArray);
});

export default router;
