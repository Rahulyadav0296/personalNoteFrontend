import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/AuthContext";
import "./CreateQuestion.css";
import Button from "./Form/Button";
import Form from "./Form/Form";
import Images from "./Form/Images";
import Priority from "./Form/Priority";

function CreateQuestion({ socket }) {
  const {
    search,
    setSearch,
    message,
    setMessage,
    imageFile,
    setImageFile,
    id,
    setEditableText,
    editableText,
    baseURL,
  } = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.on("questionCreated", (data) => {
        console.log("New Question created on the server: ", data);
      });
    }

    return () => {
      if (socket) {
        socket.off("questionCreated");
      }
    };
  }, [socket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("question", search.question);
      formData.append("answers", search.answers);
      formData.append("priority", search.priority);

      // check if the imageFile is a file(new upload)  or URL (existing image)
      if (imageFile && imageFile.length > 0) {
        for (let i = 0; i < imageFile.length; i++) {
          formData.append("images", imageFile[i]); // append each image
        }
      }
      const response = await fetch(`${baseURL}/faq/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error response
        throw new Error(
          `Failed to create question: ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setMessage("Question created successfully!");

      if (socket) {
        socket.emit("questionCreated", { question: data });
      }

      setSearch({
        question: "",
        answers: "",
        priority: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("question", search.question);
      formData.append("answers", search.answers);
      formData.append("priority", search.priority);

      if (imageFile && imageFile.length > 0) {
        for (let i = 0; i < imageFile.length; i++) {
          formData.append("images", imageFile[i]);
        }
      }
      console.log("form data is: ", formData);

      const response = await fetch(`${baseURL}/faq/${id}`, {
        method: "PUT", // Set the HTTP method to PUT
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error response
        throw new Error(
          `Failed to update: ${response.statusText} - ${errorText}`
        );
      }

      const results = await response.json(); // Parse the response
      console.log("updated details are: ", results);

      setEditableText(false);

      if (socket) {
        socket.emit("questionUpdated", { question: results });
      }

      // Reset search state
      setSearch({
        question: "",
        answers: "",
        priority: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setMessage(error.message); // Set error message if there's an error
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">What did you learn today?</h1>
      <form
        onSubmit={editableText ? handleSave : handleClick}
        className="question-form"
      >
        <Form handleChange={handleChange} />
        <Images />
        <Priority handleChange={handleChange} />
        <Button />
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default CreateQuestion;
