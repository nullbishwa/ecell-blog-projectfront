import React, { useState } from "react";

export default function FileUpload({ onFilesChange }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesChange(files); // Pass array of files to parent

      // Generate previews
      const newPreviews = files.map((file) => {
        return {
          file,
          url: URL.createObjectURL(file),
          type: file.type.startsWith("image") ? "image" : "video",
        };
      });

      setPreviews(newPreviews);
    }
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

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  alt={`Preview ${idx + 1}`}
                  className="max-h-48 w-full rounded object-cover"
                />
              ) : (
                <video controls className="max-h-48 w-full rounded">
                  <source src={preview.url} type={preview.file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
