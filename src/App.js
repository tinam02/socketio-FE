import io from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [msg, setMsg] = useState("");
  const [msgReceived, setMsgReceived] = useState("");

  const sendMsg = () => {
    socket.emit("send_msg", { msg });
  };

  // listen to broadcast
  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setMsgReceived(data.msg);
    });
  }, [socket]);

  return (
    <div className="App">
      <p>{msgReceived}</p>
      <hr />
      <input
        onChange={(evt) => {
          setMsg(evt.target.value);
        }}
        type="text"
        placeholder="message..."
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default App;
