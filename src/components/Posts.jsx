import { useState, useEffect } from "react";
import blogService from "../services/blogService";
import SkeletonCard from "./SkeletonCard";
import { formatDate } from "../utils/helpers";

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
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.authorId}</td>
                <td>{formatDate(post.createdAt)}</td>
                <td>
                  {post.published ? (
                    <span className="badge success">Published</span>
                  ) : (
                    <span className="badge warning">Draft</span>
                  )}
                </td>
                <td>
                  <menu className="buttons">
                    <li>
                      <button className="small outline">
                        {post.published ? "Remove" : "Publish"}
                      </button>
                    </li>
                    <li>
                      <button className="small outline">Edit</button>
                    </li>
                    <li>
                      <button className="small outline">Delete</button>
                    </li>
                  </menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
