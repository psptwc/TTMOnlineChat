export default function Message({ messageInfo }) {
  return (
    <div>
      <span>{messageInfo.userName}</span>
      <div>{messageInfo.message}</div>
    </div>
  );
}
