import { useState } from "react";
import { useMessages } from "./MessageContext";
import emojis from "./emojis";

export default function SendMessage() {
  const { messages, setMessages, messageBoard } = useMessages();
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(false);

  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmojiClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    emoji: string
  ) => {
    event.preventDefault();
    setNewMessage((prev) => prev + emoji);
  };

  const sendMsg = async (event: React.FormEvent<HTMLFormElement>) => {
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
      setMessages((prevMessages) => [...prevMessages, data]);
      await messageBoard();
    } catch (error) {
      console.log(error, `honestly no idea what im doing`);
    }

    setNewMessage("");
    setName("");
  };

  return (
    <form className="form" onSubmit={sendMsg}>
      <label htmlFor="">Name:</label>
      <input type="text" onChange={handleNameInput} value={name} />
      <label htmlFor="">Say something here:</label>
      <div className="msginputdiv">
        <input type="text" onChange={handleMessageInput} value={newMessage} />
        <button type="button" onClick={() => setEmoji((prev) => !prev)}>
          😀
        </button>
      </div>
      <div className="emojidiv">
        {emoji ? (
          <section className="emojibtns">
            {emojis.map((emoji, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={(e) => handleEmojiClick(e, emoji)}
                >
                  {emoji}
                </button>
              );
            })}
          </section>
        ) : (
          ""
        )}
      </div>
      <button>Send</button>
    </form>
  );
}
