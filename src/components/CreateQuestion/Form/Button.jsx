import React, { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";

function Button() {
  const { editableText } = useContext(AuthContext);
  return (
    <button type="submit" className="form-button">
      {editableText ? "Save" : "Submit"}
    </button>
  );
}

export default Button;
