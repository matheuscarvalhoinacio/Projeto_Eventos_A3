import { useEffect, useState } from "react";
import bus from "../../../util/bus";

export default function FlashMessage() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const handleFlash = ({ message, type }) => {
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);
    };

    bus.on("flash", handleFlash);
    return () => {
      bus.off("flash", handleFlash);
    };
  }, []);

  if (!message) return null;

  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}
