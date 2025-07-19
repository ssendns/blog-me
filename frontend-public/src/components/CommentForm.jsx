import { useState } from "react";
import "../assets/comment.css";

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { content };
    if (!localStorage.getItem("token")) {
      body.authorName = authorName;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("token") && {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("failed to submit comment");
      }

      const newComment = await response.json();
      onCommentAdded(newComment);
      setContent("");
      setAuthorName("");
    } catch (err) {
      console.error("error submitting comment:", err);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {!localStorage.getItem("token") && (
        <input
          type="text"
          placeholder="your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
      )}
      <textarea
        placeholder="write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">post comment</button>
    </form>
  );
}

export default CommentForm;
