import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import CommentList from "../components/CommentList"
import CommentForm from "../components/CommentForm"
import LikeButton from "../components/LikeButton"

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`)
        setPost(res.data)
      } catch (err) {
        console.error("Error fetching post", err)
      }
    }
    fetchPost()
  }, [id])

  const addComment = async (text) => {
    try {
      const res = await api.post(`/posts/${id}/comments`, { text })
      setPost({ ...post, comments: [...post.comments, res.data] })
    } catch (err) {
      alert("Error adding comment")
    }
  }

  if (!post) return <p className="p-4">Loading...</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      {post.fileUrl && (
        <img src={post.fileUrl} alt={post.title} className="mb-4 max-h-80 object-cover" />
      )}
      <LikeButton initialLikes={post.likes || 0} />
      <h2 className="mt-6 font-bold">Comments</h2>
      <CommentList comments={post.comments || []} />
      <CommentForm onSubmit={addComment} />
    </div>
  )
}
