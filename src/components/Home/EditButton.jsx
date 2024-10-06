import React, { useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../utils/AuthContext";
function EditButton({ ques }) {
  const {
    baseURL,
    questions,
    setSearch,
    setImageFile,
    setId,
    setEditableText,
  } = useContext(AuthContext);

  const socket = io(baseURL);

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
    socket.emit("editQuestion", editableQuestion);
  };
  return (
    <button className="edit-btn" onClick={() => handleEdit(ques._id)}>
      Edit
    </button>
  );
}

export default EditButton;
