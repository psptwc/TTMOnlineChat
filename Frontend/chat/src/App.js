import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";
import "./App.css";
import WaitingRoom from "./components/WaitingRoom";
import Chat from "./components/Chat";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([]);

  async function joinChat(userName, chatName) {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5271/chat")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      console.log(userName);
      console.log(message);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatName });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <main>
        <div className="chat-background">
          {connection ? (
            <Chat messages={messages} chatName={chatName} closeChat />
          ) : (
            <WaitingRoom joinChat={joinChat} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
