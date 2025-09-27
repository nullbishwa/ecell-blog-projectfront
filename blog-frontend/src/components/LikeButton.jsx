import React, { useState } from "react";
import api from "../api";

const LikeButton = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      setLikes(res.data.likes.length);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleLike} className="bg-blue-500 text-white px-2 py-1 rounded">
      {liked ? "Unlike" : "Like"} ({likes})
    </button>
  );
};

export default LikeButton;
