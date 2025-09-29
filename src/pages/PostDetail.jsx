import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${slug}`);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      {post.media && post.media.length > 0 && (
        <div className="space-y-2">
          {post.media.map((url, i) => (
            <img key={i} src={url} alt="media" className="rounded" />
          ))}
        </div>
      )}
    </div>
  );
}
