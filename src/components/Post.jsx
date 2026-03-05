import { useEffect, useState } from "react";
import BlogService from "../services/blogService";
import SkeletonCard from "./SkeletonCard";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/helpers";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const service = new BlogService();
      setLoading(true);
      const result = await service.getPostById(id);

      setPost(result);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <article>
      <section>
        <header>
          <div>
            <h2>{post?.title}</h2>
            <small>{formatDate(post?.createdAt)}</small>
          </div>
          {post?.published ? (
            <span className="badge success">Published</span>
          ) : (
            <span className="badge warning">Draft</span>
          )}
        </header>
        <br></br>
        <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
      </section>
    </article>
  );
}
