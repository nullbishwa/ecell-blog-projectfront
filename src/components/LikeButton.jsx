import React, { useState } from "react"

export default function LikeButton({ initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <button
      onClick={toggleLike}
      className={`px-3 py-1 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-200"}`}
    >
      ❤️ {likes}
    </button>
  )
}
