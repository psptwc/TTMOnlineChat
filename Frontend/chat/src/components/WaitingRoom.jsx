import { useState } from "react";

export default function WaitingRoom({ joinChat }) {
  const [userName, setUserName] = useState();
  const [chatName, setChatName] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        joinChat(userName, chatName)
    }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <label htmlFor="userName">Your name</label>
        <input
          onChange={(event) => setUserName(event.target.value)}
          className="control"
          name="userName"
          placeholder="name"
        />

        <label htmlFor="chatName">Chat name</label>
        <input
          onChange={(event) => setChatName(event.target.value)}
          className="control"
          name="chatName"
          placeholder="chat"
        />

        <button className="button" type="submit">
          Connect
        </button>
      </form>
    </section>
  );
}
