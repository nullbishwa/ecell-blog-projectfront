import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import LikeButton from "../components/LikeButton";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post", err);
      }
    };
    fetchPost();
  }, [slug]);

  const addComment = async (text) => {
    try {
      const res = await api.post(`/posts/${post._id}/comment`, { text });
      setPost(res.data); // backend returns updated post with new comment
    } catch (err) {
      alert("Error adding comment");
    }
  };

  if (!post) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.content}</p>

      {/* Media Display */}
      {post.media && post.media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {post.media.map((file, index) =>
            file.type.startsWith("image") ? (
              <img
                key={index}
                src={file.url}
                alt={post.title}
                className="max-h-96 rounded object-cover w-full"
              />
            ) : (
              <video
                key={index}
                controls
                className="max-h-96 rounded w-full"
                preload="metadata"
              >
                <source src={file.url} type={file.type} />
                Your browser does not support the video tag.
              </video>
            )
          )}
        </div>
      )}

      {/* Like Button */}
      <LikeButton initialLikes={post.likes?.length || 0} />

      {/* Comments Section */}
      <h2 className="mt-6 font-bold">Comments</h2>
      <CommentList comments={post.comments || []} />
      <CommentForm onSubmit={addComment} />
    </div>
  );
}
