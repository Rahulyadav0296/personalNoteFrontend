import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import Home from "./components/Home/Home";
import { AuthContext } from "./utils/AuthContext";
function App() {
  const [showBtn, setShowBtn] = useState(false);
  const { baseURL = "http://localhost:3000" } = useContext(AuthContext);
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseURL, {
        transports: ["websocket"],
        reconnectionAttempts: 5, // Limit the number of reconnection attempts
        reconnectionDelay: 1000,
      });

      socket.current.connect();
    }

    return () => {
      if (socket.connect) {
        socket.current.disconnect();
      }
    };
  }, [baseURL]);
  return (
    <div className="faq-page">
      <img className="faq-logo" src="./Rahul.png" alt="The logo of mine" />

      <button
        className="create-topic-btn"
        onClick={() => {
          setShowBtn(!showBtn);
        }}
      >
        Create New Topic
      </button>

      {showBtn && <CreateQuestion socket={socket.current} />}

      <Home socket={socket.current} />
    </div>
  );
}

export default App;
