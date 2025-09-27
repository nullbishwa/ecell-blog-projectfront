import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import { formatDate } from "../utils/helpers";

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 bg-white">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">
        By {post.author.username} | {formatDate(post.createdAt)}
      </p>
      {post.media && (
        <div className="my-2">
          <img src={post.media} alt={post.title} className="max-h-60 w-full object-cover" />
        </div>
      )}
      <p className="mb-2">{post.content.substring(0, 150)}...</p>
      <LikeButton post={post} />
      <Link
        to={`/post/${post.slug}`}
        className="text-blue-600 font-semibold ml-2"
      >
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
