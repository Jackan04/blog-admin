import { useState, useEffect } from "react";
import blogService from "../services/blogService";
import SkeletonCard from "./SkeletonCard";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await blogService.getAllPosts();
      setPosts(result);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SkeletonCard></SkeletonCard>;
  }
  return (
    <>
      <ul>
        {posts.map((post) => (
          <article className="card" key={post.id}>
            <header>
              <h3>{post.title}</h3>
              <p>{post.createdAt}</p>
            </header>
            <footer className="flex gap-2 mt-4">
              <button>Read More</button>
            </footer>
          </article>
        ))}
      </ul>
    </>
  );
}
