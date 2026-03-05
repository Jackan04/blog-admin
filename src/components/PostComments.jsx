import { useEffect, useState } from "react";
import BlogService from "../services/blogService";

const service = new BlogService();
export default function PostComments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadComments() {
      const result = await service.getPostComments(post.id);
      setComments(result);
    }
    loadComments();
  }, [post]);

  return (
    <section>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => <p>{comment.text}</p>)
      ) : (
        <p>Be the first to write a comment on this post!</p>
      )}
    </section>
  );
}
