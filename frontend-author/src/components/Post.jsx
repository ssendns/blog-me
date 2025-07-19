import "../assets/postList.css";

export default function Post({ post }) {
  const currentUser = localStorage.getItem("username");

  return (
    <li className="post-card">
      <a href={`/posts/${post.id}`}>
        <strong>
          {post.title} {!post.published && <span className="lock">🔒</span>}
        </strong>
      </a>
      <p className="post-author">by {post.authorName || "anon"}</p>
      <p className="post-snippet">{post.content.slice(0, 150)}...</p>
      {post.authorName === currentUser && (
        <a className="edit-link" href={`/edit/${post.id}`}>
          edit
        </a>
      )}
    </li>
  );
}
