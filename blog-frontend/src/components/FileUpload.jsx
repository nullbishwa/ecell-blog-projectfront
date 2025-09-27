import React, { useState } from "react";
import api from "../api";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/posts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(res.data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
