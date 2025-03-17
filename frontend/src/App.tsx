import { MessagesProvider } from "./MessageContext";
import Chat from "./Chat";
import SendMessage from "./SendMessage";

function App() {
  return (
    <MessagesProvider>
      <Chat />
      <SendMessage />
    </MessagesProvider>
  );
}

export default App;
