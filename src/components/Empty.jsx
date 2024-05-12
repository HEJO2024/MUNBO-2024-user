import "../styles/components/Empty.css";

import EmptyImg from "../assets/empty.svg";

export default function Empty({ message }) {
  return (
    <div className="empty">
      <img src={EmptyImg} alt="empty"></img>
      <p>{message}</p>
    </div>
  );
}
