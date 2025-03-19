import { useEffect } from "react";
import { useMessages } from "./MessageContext";
import MessageCard from "./MessageCard";
import socket from "./websocket";

export default function Chat() {
  const { messages, setMessages, messageBoard } = useMessages();

  const deleteMessage = async (id: string) => {
    const apiUrl = `https://mini-message-board-znqy.onrender.com/api/messages/${id}`;
    const prevMsgs = messages;
    setMessages((prev) => prev.filter((msg) => msg._id !== id));

    try {
      const res = await fetch(apiUrl, { method: "DELETE" });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      socket.send(JSON.stringify({ type: "delete", id }));
    } catch (error) {
      console.error("Error deleting msg:", error);
      setMessages(prevMsgs);
    }
  };

  const editMessage = async (id: string, newEdit: string) => {
    try {
      const res = await fetch(
        `https://mini-message-board-znqy.onrender.com/api/messages/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newEdit }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to edit message");
      }
      socket.send(JSON.stringify({ type: "edit", id, text: newEdit }));
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

  useEffect(() => {
    const handleSocketMsg = async (event: MessageEvent) => {
      let textData;
      if (event.data instanceof Blob) {
        textData = await event.data.text();
      } else {
        textData = event.data;
      }

      try {
        const msg = JSON.parse(textData);
        if (!msg || !msg.type || !msg.date || !msg.text) return;

        setMessages((prev) => {
          if (msg.type === "delete")
            return prev.filter((m) => m._id !== msg.id);
          if (msg.type === "edit")
            return prev.map((m) =>
              m._id === msg.id ? { ...m, text: msg.text } : m
            );
          return [...prev, msg];
        });
      } catch (error) {
        console.warn(`non json msg`, event.data);
      }
    };

    socket.addEventListener("message", handleSocketMsg);

    return () => {
      socket.removeEventListener("message", handleSocketMsg);
    };
  }, [setMessages]);

  return (
    <>
      <h1>MessageBoard</h1>
      {messages.map((message, index) => {
        return (
          <MessageCard
            key={index}
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
