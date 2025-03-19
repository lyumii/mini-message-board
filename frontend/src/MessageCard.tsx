import { useState, useEffect } from "react";

export interface CardProps {
  _id: string;
  user: string;
  text: string;
  date: Date;
  deleteMsg: (id: string) => void;
  addEdit: (id: string, newEdit: string) => void;
}

export default function MessageCard(props: CardProps) {
  const [edit, setEdit] = useState(false);
  const [newEdit, setNewEdit] = useState(props.text);

  const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEdit((prev) => !prev);
  };

  useEffect(() => {
    setNewEdit(props.text);
  }, [props.text]);

  return (
    <div className="msg">
      <p>
        <span>{props.user}</span>: {props.text}
      </p>
      <p className="timestamp">
        {props.date ? new Date(props.date).toLocaleString() : "No Date"}
      </p>
      <button type="button" onClick={() => props.deleteMsg(props._id)}>
        🗑️
      </button>
      <button type="button" onClick={handleEditButton}>
        ✏️
      </button>
      {edit ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.addEdit(props._id, newEdit);
            setEdit(false);
          }}
        >
          <input
            type="text"
            value={newEdit}
            onChange={(e) => setNewEdit(e.target.value)}
          />
          <button type="submit">✅</button>
          <button type="button" onClick={() => setEdit(false)}>
            ❌
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
