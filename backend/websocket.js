import { WebSocketServer } from "ws";

export function setUpWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log(`a client connected`);

    socket.send(JSON.stringify({ system: "Welcome to the socket server!" }));

    socket.on("message", (msg) => {
      const messageString = typeof msg === "string" ? msg : msg.toString();
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageString);
        }
      });
    });

    socket.on("close", () => {
      console.log(`disconnected`);
    });
  });
  return wss;
}
