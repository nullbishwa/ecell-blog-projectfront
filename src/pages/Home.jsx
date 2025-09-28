import React, { useEffect, useState } from "react"
import api from "../api"
import PostCard from "../components/PostCard"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts")
        setPosts(res.data)
      } catch (err) {
        console.error("Error fetching posts", err)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((p) => <PostCard key={p._id} post={p} />)
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  )
}
