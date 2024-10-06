import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [showQues, setShowQues] = useState(false);
  const [search, setSearch] = useState({
    question: "",
    answers: "",
    priority: "",
  });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editableText, setEditableText] = useState(false);
  const baseURL = "http://localhost:3000";
  const [id, setId] = useState("");

  return (
    <AuthContext.Provider
      value={{
        questions,
        setQuestions,
        showQues,
        setShowQues,
        search,
        setSearch,
        message,
        setMessage,
        imageFile,
        setImageFile,
        editableText,
        setEditableText,
        baseURL,
        id,
        setId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
