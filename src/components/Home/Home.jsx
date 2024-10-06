import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../utils/AuthContext";
import Answers from "./Answers";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import "./Home.css";
import Questions from "./Questions";

function Home() {
  const { message, setQuestions, questions, baseURL } = useContext(AuthContext);
  const [expendableId, setExpendableId] = useState(null);
  const socket = io(baseURL);
  useEffect(() => {
    const fetchFaq = async () => {
      const response = await fetch(`${baseURL}/faq`);
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    };

    fetchFaq();

    // listen for real-time "newData" event from the server
    socket.on("newData", (newQuestion) => {
      console.log("New Data Received: ", newQuestion);
      setQuestions((prevQues) => [newQuestion, ...prevQues]);
    });
    socket.on("editQuestion", (updatedQuestion) => {
      console.log("Question Edited: ", updatedQuestion);
      setQuestions((prevQues) =>
        prevQues.map((ques) =>
          ques._id === updatedQuestion._id ? updatedQuestion : ques
        )
      );
    });

    // Listen for real-time "deleteQuestion" event from the server
    socket.on("deleteQuestion", (deletedId) => {
      console.log("Question Deleted: ", deletedId);
      setQuestions((prevQues) =>
        prevQues.filter((ques) => ques._id !== deletedId)
      );
    });

    return () => {
      // Clean up socket listeners when the component unmounts
      socket.off("newData");
      socket.off("editQuestion");
      socket.off("deleteQuestion");
      socket.disconnect();
    };
  }, [baseURL]);

  return (
    <div className="faq-container">
      {questions &&
        questions.map((ques) => (
          <div key={ques._id} className="faq-item">
            <Questions
              ques={ques}
              onClick={() => {
                setExpendableId(ques._id);
              }}
              expendableId={expendableId}
            />

            {expendableId === ques._id && <Answers ques={ques} />}

            <div className="faq-actions">
              <EditButton ques={ques} />
              <DeleteButton ques={ques} />
            </div>
          </div>
        ))}
      {message && <p className="faq-message">{message}</p>}
    </div>
  );
}

export default Home;
