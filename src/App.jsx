import React, { useState } from "react";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import Home from "./components/Home/Home";

function App() {
  const [showBtn, setShowBtn] = useState(false);
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

      {showBtn && <CreateQuestion />}

      <Home />
    </div>
  );
}

export default App;
