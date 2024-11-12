import { useState } from "react";
import Message from "./Message";

export default function Chat({ messages, chatName, closeChat }) {
  return (
    <section>
      <h2>{chatName}</h2>
      <button onClick={closeChat}>Close chat</button>

      <div className="screen-messages">
        {messages.map((messageInfo, index) => (
          <Message messageInfo={messageInfo} key={index} />
        ))}
      </div>

      <form>
        <input style={{marginTop: "1rem"}}className="control input-message" placeholder="Text" />
        <button className="button send-message" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
