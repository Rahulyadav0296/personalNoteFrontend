import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/AuthContext";

function Images() {
  const { setImageFile, imageFile } = useContext(AuthContext);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get multiple files
    console.log("Files selected: ", files);

    if (files.length > 0) {
      // Update the image files in context or state
      const updatedFiles = [...imageFile, ...files]; // Concatenate old files with new files
      setImageFile(updatedFiles); 

      // Create preview URLs for the new files and concatenate with existing URLs
      const fileUrls = files.map((file) => URL.createObjectURL(file)); // Create preview URLs
      setPreviewUrls((prevUrls) => [...prevUrls, ...fileUrls]); // Concatenate new URLs with existing ones
      console.log("File URLs: ", fileUrls); // Debugging to check URL creation
    } else {
      console.log("No files selected or files are invalid");
    }
  };

  // Cleanup URLs when component unmounts or new files are selected
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url)); // Clean up URLs
    };
  }, [previewUrls]);

  return (
    <div className="form-group">
      <label className="form-label">Choose Image Files:</label>
      <input
        type="file"
        accept="image/*"
        multiple // enable multiple file selection
        onChange={handleFileChange}
      />
      {previewUrls.length > 0 && (
        <div>
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Selected ${index}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
