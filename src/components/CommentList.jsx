import React from "react";
import { formatDate } from "../utils/helpers";

const CommentList = ({ comments }) => {
  return (
    <div className="mt-2">
      <h3 className="font-bold mb-1">Comments:</h3>
      {comments.map((c) => (
        <div key={c._id} className="border-b py-1">
          <p className="text-sm font-semibold">{c.user.username}</p>
          <p>{c.text}</p>
          <p className="text-xs text-gray-500">{formatDate(c.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
