import { useState, useEffect } from "react";

export default function App() {
  const messageBoard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error, `no idea what im doing lol`);
    }
  };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");

  const handleMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const sendMsg = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;
    const userName = name.trim() === "" ? "Anon" : name;
    const newMsg = { user: userName, text: newMessage };

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newMsg),
      });

      if (!res.ok) {
        throw new Error(`failed to post`);
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error, `honestly no idea what im doing`);
    }

    setNewMessage("");
    setName("");
  };

  useEffect(() => {
    messageBoard();
  }, []);

  return (
    <div className="main">
      <h1>MessageBoard</h1>
      {messages.map((message, index) => (
        <div className="msg" key={index}>
          <p>
            <span>{message.user}</span>: {message.text}
          </p>
        </div>
      ))}
      <form className="form" onSubmit={sendMsg}>
        <label htmlFor="">Name:</label>
        <input type="text" onChange={handleNameInput} value={name} />
        <label htmlFor="">Say something here:</label>
        <input type="text" onChange={handleMessageInput} value={newMessage} />

        <button>Send</button>
      </form>
    </div>
  );
}
