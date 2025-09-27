import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to comment");

    try {
      const res = await api.post(`/posts/${postId}/comment`, { text });
      onCommentAdded(res.data);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mt-1">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
