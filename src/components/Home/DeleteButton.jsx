import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

function DeleteButton({ ques, socket }) {
  const { baseURL, setQuestions, setMessage } = useContext(AuthContext);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${baseURL}/faq/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setQuestions((prevQuestion) =>
          prevQuestion.filter((ques) => ques._id !== id)
        );
        setMessage("Question deleted successfully");
      }

      // Emit an event to notify other clients that the question has been deleted
      if (socket) {
        socket.emit("deleteQuestion", id);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      setMessage("An error occurred while deleting the question.");
    }
  };
  return (
    <button className="delete-btn" onClick={() => handleDelete(ques._id)}>
      Delete
    </button>
  );
}

export default DeleteButton;
