import React, { useState } from "react";

export default function FileUpload({ onFilesChange }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesChange(files); // pass array of files to parent

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({ url: reader.result, type: file.type });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((results) => setPreviews(results));
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
        <div className="grid grid-cols-2 gap-2 mt-2">
          {previews.map((file, idx) =>
            file.type.startsWith("image") ? (
              <img
                key={idx}
                src={file.url}
                alt={`Preview ${idx}`}
                className="max-h-48 w-full object-cover rounded"
              />
            ) : (
              <video
                key={idx}
                controls
                className="max-h-48 w-full rounded object-cover"
              >
                <source src={file.url} type={file.type} />
                Your browser does not support the video tag.
              </video>
            )
          )}
        </div>
      )}
    </div>
  );
}
