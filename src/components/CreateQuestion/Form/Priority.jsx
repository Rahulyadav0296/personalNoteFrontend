import React, { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";

function Priority({ handleChange }) {
  const { search } = useContext(AuthContext);
  const categories = ["choose option", "low", "medium", "high"];
  return (
    <div className="form-group">
      <label className="form-label">Priority:</label>
      <select
        className="form-select"
        onChange={handleChange}
        name="priority"
        value={search.priority}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Priority;
