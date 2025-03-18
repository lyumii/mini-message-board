const socket = new WebSocket("wss://mini-message-board-znqy.onrender.com");

socket.onopen = () => console.log("✅ WebSocket connected!");
socket.onclose = () => console.log("❌ WebSocket disconnected!");

export default socket;
