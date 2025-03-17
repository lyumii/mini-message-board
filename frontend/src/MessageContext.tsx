import { createContext, useState, useContext, ReactNode } from "react";
import { CardProps } from "./MessageCard";

interface MessageContextType {
  messages: CardProps[];
  setMessages: React.Dispatch<React.SetStateAction<CardProps[]>>;
  messageBoard: () => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [messages, setMessages] = useState<CardProps[]>([]);

  const messageBoard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      const data: CardProps[] = await res.json();
      console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.log(error, `no idea what im doing lol`);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, setMessages, messageBoard }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(`useMessages must be used with provider`);
  }
  return context;
};
