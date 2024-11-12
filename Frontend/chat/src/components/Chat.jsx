import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "./Chat.css";

export default function Chat({ messages, chatName, closeChat, sendMessage }) {
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  const onSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView();
  }, [messages]);

  return (
    <section>
      <div className="chat-head">
        <h2>{chatName}</h2>
        <button className="button-close-chat" type="submit" onClick={closeChat}>
          Close
        </button>
      </div>

      <div className="screen-messages">
        {messages.map((messageInfo, index) => (
          <Message messageInfo={messageInfo} key={index} />
        ))}
        <span ref={messageEndRef} />
      </div>

      <form onSubmit={onSendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="control input-message"
          placeholder="Text"
          type="text"
        />
        <button className="button send-message" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
