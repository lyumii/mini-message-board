import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes/messages.js";
import connectDB from "./database.js";
import { setUpWebSocket } from "./websocket.js";

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

setUpWebSocket(server);
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/messages", router);

app.get("/", (req, res) => {
  res.send(`We're in business!!`);
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
