import React from "react"

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>
  }

  return (
    <div className="space-y-2">
      {comments.map((c) => (
        <div key={c._id} className="border-b pb-2">
          <p className="font-semibold">{c.user?.username || "Anonymous"}</p>
          <p className="text-gray-700">{c.text}</p>
          <span className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
