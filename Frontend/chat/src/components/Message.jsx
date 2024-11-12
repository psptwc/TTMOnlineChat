import "./Message.css"

export default function Message({ messageInfo }) {
  return (
    <div className="message-item">
      <span className="message-username">{messageInfo.userName}</span>
      <div className="message-text">{messageInfo.message}</div>
    </div>
  );
}
