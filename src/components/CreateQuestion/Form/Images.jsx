import React, { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";

function Images() {
  const { setImageFile, imageFile } = useContext(AuthContext);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected: ", file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageFile(file);
      console.log("File URL: ", fileUrl); // Debugging to check URL creation
    } else {
      console.log("No file selected or file is invalid");
    }
  };
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="fileInput">
        Choose Image File:
      </label>
      <input
        id="fileInput"
        className="form-file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {imageFile && (
        <div>
          <img
            src={imageFile}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Images;
