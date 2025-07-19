import "../assets/comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <p className="comment-author">
        by <strong>{comment.authorName || "anon"}</strong>
      </p>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
}
