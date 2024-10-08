import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
function EditButton({ ques, socket }) {
  const {
    baseURL,
    questions,
    setSearch,
    setImageFile,
    setId,
    setEditableText,
  } = useContext(AuthContext);

  const handleEdit = (id) => {
    const editableQuestion = questions.find((ques) => ques._id === id);

    setSearch({
      question: editableQuestion.question,
      answers: editableQuestion.answers,
      priority: editableQuestion.priority,
    });
    // Set the correct image URL for the preview
    if (editableQuestion.image) {
      const imagePreviewUrl = `${baseURL}/${editableQuestion.image}`;
      setImageFile(imagePreviewUrl);
    }
    setId(id);
    setEditableText(true);

    //Emit an event to notify other clients that a question is being edited
    if (socket) {
      socket.emit("editQuestion", editableQuestion);
    }
  };
  return (
    <button className="edit-btn" onClick={() => handleEdit(ques._id)}>
      Edit
    </button>
  );
}

export default EditButton;
