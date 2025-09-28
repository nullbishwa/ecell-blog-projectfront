import React from "react"

export default function FileUpload({ onFileChange }) {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="border p-2 rounded"
      />
    </div>
  )
}
