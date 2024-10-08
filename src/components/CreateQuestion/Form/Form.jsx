import React, { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";

function Form({ handleChange }) {
  const { search } = useContext(AuthContext);
  return (
    <>
      <div className="form-group">
        <label className="form-label">Question:</label>
        <input
          className="form-input"
          type="text"
          name="question"
          value={search.question}
          onChange={handleChange}
          placeholder="Enter Question..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Answer:</label>
        <textarea
          className="form-textarea"
          name="answers"
          value={search.answers}
          onChange={handleChange}
          placeholder="Enter Answer..."
          rows="10"
          cols="50"
        />
      </div>
    </>
  );
}

export default Form;
