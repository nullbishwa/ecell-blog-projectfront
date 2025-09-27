import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "../utils/helpers";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${slug}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${post._id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCommentAdded = (updatedPost) => {
    setPost(updatedPost);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        By {post.author.username} | {formatDate(post.createdAt)}
      </p>
      {post.media && <img src={post.media} alt={post.title} className="mb-4 w-full max-h-96 object-cover rounded" />}
      <p className="mb-4">{post.content}</p>

      <LikeButton post={post} />

      {user && (user.role === "admin" || user._id === post.author._id) && (
        <div className="mt-4 space-x-2">
          <button
            onClick={() => navigate(`/create/${post._id}`)}
            className="bg-yellow-500 px-3 py-1 rounded text-white"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Delete
          </button>
        </div>
      )}

      <CommentList comments={post.comments} />
      {user && <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />}
    </div>
  );
};

export default PostDetail;
