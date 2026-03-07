import { useEffect, useState } from "react";
import BlogService from "../services/blogService";
import SkeletonCard from "./SkeletonCard";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import PostComments from "./PostComments";

export default function Post() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const service = new BlogService();
      setLoading(true);

      try {
        const result = await service.getPostById(id);
        const author = await service.getAuthorById(result.authorId);
        setPost(result);
        setAuthor(author);
      } catch (error) {
        console.error("Failed to load post details", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <article className="vstack gap-4">
      <section className="vstack gap-2">
        <header className="hstack justify-between items-center">
          <div className="vstack gap-1">
            <h2>{post?.title}</h2>
            <small className="text-light">{formatDate(post?.createdAt)}</small>
            <small className="text-light">Written by {author?.username}</small>
          </div>
          {post?.published ? (
            <span className="badge success">Published</span>
          ) : (
            <span className="badge warning">Draft</span>
          )}
        </header>
        <hr />
        <article>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </article>
      </section>
      <hr />
      <section>
        <PostComments post={post} />
      </section>
    </article>
  );
}
