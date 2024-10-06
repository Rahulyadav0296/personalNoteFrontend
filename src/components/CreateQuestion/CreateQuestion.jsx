import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import "./CreateQuestion.css";
import Button from "./Form/Button";
import Form from "./Form/Form";
import Images from "./Form/Images";
import Priority from "./Form/Priority";

function CreateQuestion() {
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
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${baseURL}/faq/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to Update: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setMessage("Question created successfully!");
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

      if (typeof imageFile === "object" && imageFile instanceof File) {
        formData.append("image", imageFile);
      }

      console.log("form data is: ", formData);

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      const response = await fetch(`${baseURL}/faq/${id}`, {
        method: "PUT", // Set the HTTP method to PUT
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }

      const results = await response.json(); // Parse the response
      console.log("updated details are: ", results);

      setEditableText(false);

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
