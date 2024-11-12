import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import WaitingRoom from "./components/WaitingRoom";

function App() {
  async function joinChat(userName, chatName) {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5271/chat")
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatName });

      console.log(connection)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <main>
        <div className="chat-background">
          <WaitingRoom joinChat={joinChat} />
        </div>
      </main>
    </div>
  );
}

export default App;
