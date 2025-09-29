import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import FileUpload from "../components/FileUpload";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // multiple files
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      // Append all selected files with the key "media"
      files.forEach((file) => {
        formData.append("media", file);
      });

      // Send request to backend
      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Redirect to the newly created post's detail page
      navigate(`/posts/${res.data.slug}`);
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post");
    }
  };

  if (!user) return <p className="p-4">You must be logged in to create posts.</p>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FileUpload files={files} setFiles={setFiles} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
