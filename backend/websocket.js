import WebSocket from "ws";

export default function setUpWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log(`a client connected`);

    socket.send(`welcome to socket server`);

    socket.on("message", (msg) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });

    socket.on("close", () => {
      console.log(`disconnected`);
    });
  });
  return wss;
}
