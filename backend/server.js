import express from "express";
import cors from "cors";
import router from "./routes/messages.js";
import connectDB from "./database.js";

const app = express();
const port = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/messages", router);

app.get("/", (req, res) => {
  res.send(`We're in business!!`);
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
