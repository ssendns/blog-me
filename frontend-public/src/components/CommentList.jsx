import "../assets/comment.css";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">no comments yet</p>;
  }

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p className="comment-author">
            by <strong>{comment.authorName || "anon"}</strong>
          </p>
          <p className="comment-content">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
