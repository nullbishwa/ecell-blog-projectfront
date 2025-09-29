import React, { useState, useEffect } from "react";

export default function FileUpload({ files, setFiles }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      {previews.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {previews.map((preview, idx) =>
            files[idx].type.startsWith("image") ? (
              <img
                key={idx}
                src={preview}
                alt="Preview"
                className="max-h-48 rounded object-cover"
              />
            ) : (
              <video key={idx} controls className="max-h-48 rounded">
                <source src={preview} type={files[idx].type} />
                Your browser does not support the video tag.
              </video>
            )
          )}
        </div>
      )}
    </div>
  );
}
