import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

function Answers({ ques }) {
  const { baseURL } = useContext(AuthContext);
  return (
    <>
      <p className="faq-answer">
        <strong>Answer:</strong> {ques.answers}
      </p>

      {/* Image */}
      {ques.image && (
        <img
          className="faq-image"
          src={`${baseURL}/${ques.image}`} // Ensure the image path is correct here
          alt={ques.question}
        />
      )}
      <p className="faq-date">
        {new Date(ques.createdAt).toLocaleDateString()}
      </p>
    </>
  );
}

export default Answers;
