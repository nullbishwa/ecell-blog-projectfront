import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import FileUpload from "../components/FileUpload";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content, tags: tags.split(","), media };
      if (id) {
        await api.put(`/posts/${id}`, postData);
      } else {
        await api.post("/posts", postData);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Post submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">{id ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-4 rounded h-40"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <FileUpload onUpload={(url) => setMedia(url)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CreatePost;
