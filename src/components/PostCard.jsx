import React from "react"
import { Link } from "react-router-dom"

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">
        <Link to={`/post/${post._id}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-2">{post.excerpt}</p>
      <p className="text-sm text-gray-500">
        By {post.author?.username || "Unknown"} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
