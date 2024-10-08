import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

function Answers({ ques }) {
  const { baseURL } = useContext(AuthContext);
  return (
    <>
      <div
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p className="faq-answer">
          <strong>Answer:</strong> {ques.answers}
        </p>
      </div>

      {/* Image */}
      {ques.image &&
        ques.image.map((q, index) => (
          <img
            key={index}
            className="faq-image"
            src={`${baseURL}/${q}`} // Ensure the image path is correct here
            alt={`image${index}`}
          />
        ))}
      <p className="faq-date">
        {new Date(ques.createdAt).toLocaleDateString()}
      </p>
    </>
  );
}

export default Answers;
