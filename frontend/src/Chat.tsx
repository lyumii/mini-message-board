import { useEffect } from "react";
import { useMessages } from "./MessageContext";
import MessageCard from "./MessageCard";

export default function Chat() {
  const { messages, setMessages, messageBoard } = useMessages();

  const deleteMessage = async (id: string) => {
    const apiUrl = `http://localhost:5000/api/messages/${id}`;
    const prevMsgs = messages;
    setMessages((prev) => prev.filter((msg) => msg._id !== id));

    try {
      const res = await fetch(apiUrl, { method: "DELETE" });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
    } catch (error) {
      console.error("Error deleting msg:", error);
      setMessages(prevMsgs);
    }
  };

  const editMessage = async (id: string, newEdit: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newEdit }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit message");
      }

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, text: newEdit } : msg))
      );
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  useEffect(() => {
    messageBoard();
  }, []);

  return (
    <>
      <h1>MessageBoard</h1>
      {messages.map((message) => {
        return (
          <MessageCard
            key={message._id}
            _id={message._id}
            user={message.user}
            text={message.text}
            date={new Date(message.date)}
            deleteMsg={deleteMessage}
            addEdit={editMessage}
          />
        );
      })}
    </>
  );
}
