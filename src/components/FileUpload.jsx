import React, { useState } from "react"

export default function FileUpload({ onFileChange }) {
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileChange(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      {preview && (
        <div className="mt-2">
          {preview.startsWith("data:image") ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded object-cover"
            />
          ) : (
            <video controls className="max-h-48 rounded">
              <source src={preview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  )
}
