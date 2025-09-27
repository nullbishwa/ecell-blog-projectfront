import React from "react";
import { useFetch } from "../hooks/useFetch";
import PostCard from "../components/PostCard";

const Home = () => {
  const { data: posts, loading, error } = useFetch("/posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
