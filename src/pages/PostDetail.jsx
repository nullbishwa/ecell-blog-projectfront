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

  if (loading) return <p className="p-4">Loading post...</p>;
  if (!post) return <p className="p-4">Post not found</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author.username}</p>
      <p className="mb-4">{post.content}</p>

      {post.media && post.media.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.media.map((m) =>
            m.type === "image" ? (
              <img
                key={m.fileId}
                src={m.url}
                alt="Post media"
                className="max-h-48 rounded object-cover"
              />
            ) : (
              <video key={m.fileId} controls className="max-h-48 rounded">
                <source src={m.url} type={m.mimeType} />
              </video>
            )
          )}
        </div>
      )}
    </div>
  );
}
