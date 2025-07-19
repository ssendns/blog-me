import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/post.css";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/public/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("post not found");
        return res.json();
      })
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>loading...</p>;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>
        <i>by {post.author || "anon"}</i>
      </p>
      <div>{post.content}</div>

      <hr />
      <h2>comments</h2>
      {post.comments.length === 0 ? (
        <p>no comments yet</p>
      ) : (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.authorName}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
