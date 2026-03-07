import { useEffect, useState } from "react";
import BlogService from "../services/blogService";
import { formatDate } from "../utils/helpers";
import ConfirmDialog from "./ConfirmDialog";

const service = new BlogService();

export default function PostComments({ post }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadComments() {
      if (!post?.id) return;

      try {
        const result = await service.getPostComments(post.id);
        setComments(result);
      } catch (error) {
        console.error("Failed to load comments", error);
      }
    }

    loadComments();
  }, [post?.id]);

  async function handleDeleteComment(id) {
    try {
      await service.deletePostCommentById(id);
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.id !== id),
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!post?.id) return;

    try {
      const newComment = await service.createComment(post.id, {
        text: comment,
      });
      setComments((prev) => [...prev, newComment]);
      setComment("");
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  }

  return (
    <section className="vstack gap-2">
      <header className="hstack justify-between">
        <h3>Comments ({comments.length})</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <label data-field htmlFor="text">
          <input
            value={comment}
            onChange={handleCommentChange}
            type="text"
            id="text"
            name="text"
          />
        </label>
        <button type="submit">Post</button>
      </form>
      <br />
      {comments.length > 0 ? (
        <div className="vstack">
          {comments.map((comment) => (
            <article className="card" key={comment.id}>
              <p>{comment.text}</p>
              <div className="hstack justify-between">
                <small className="text-light">
                  {formatDate(comment.createdAt)}
                </small>
                <button
                  onClick={() => setIsOpen(true)}
                  data-variant="danger"
                  className="outline"
                >
                  Delete
                </button>
              </div>
              <ConfirmDialog
                itemName="Comment"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                onConfirm={() => handleDeleteComment(comment.id)}
              />
            </article>
          ))}
        </div>
      ) : (
        <p className="text-light">
          Be the first to write a comment on this post!
        </p>
      )}
    </section>
  );
}
