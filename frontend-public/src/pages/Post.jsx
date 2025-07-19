import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/post.css";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postRes = await fetch(`http://localhost:3000/posts/public/${id}`);
      const postData = await postRes.json();
      setPost(postData);

      const commentRes = await fetch(
        `http://localhost:3000/posts/${id}/comments`
      );
      const commentData = await commentRes.json();
      setComments(commentData);
    }

    fetchData();
  }, [id]);

  const handleNewComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

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
      <CommentList comments={comments} />
      <CommentForm postId={id} onCommentAdded={handleNewComment} />
    </div>
  );
}
