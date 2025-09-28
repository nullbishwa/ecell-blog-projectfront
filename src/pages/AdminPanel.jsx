import React, { useEffect, useState } from "react"
import api from "../api"

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await api.get("/admin/users")
        const resPosts = await api.get("/admin/posts")
        setUsers(resUsers.data)
        setPosts(resPosts.data)
      } catch (err) {
        console.error("Error loading admin data", err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold">Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u._id}>{u.username} - {u.email}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Posts</h2>
          <ul>
            {posts.map((p) => (
              <li key={p._id}>{p.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
