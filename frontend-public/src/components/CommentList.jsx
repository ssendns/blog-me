import "../assets/comment.css";
import Comment from "./Comment";
import React from "react";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="no-comments-message">no comments yet</p>;
  }

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
