import { useState, useEffect } from "react";
import BlogService from "../services/blogService";
import SkeletonCard from "./SkeletonCard";
import { formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

const service = new BlogService();

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const result = await service.getAllPosts();
      setPosts(result);
      setLoading(false);
    }
    loadPosts();
  }, []);

  async function handleDeletePost(id) {
    await service.deletePostById(id);
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
    setIsOpen(false);
    setSelectedPost(null);
  }

  function openDeleteDialog(post) {
    setSelectedPost(post);
    setIsOpen(true);
  }

  function closeDeleteDialog() {
    setIsOpen(false);
    setSelectedPost(null);
  }

  if (loading) {
    return <SkeletonCard />;
  }
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                {" "}
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </td>
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
                    <Link
                      className="button small outline"
                      to={`/posts/update/${post.id}`}
                    >
                      Edit
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => openDeleteDialog(post)}
                      className="small outline"
                    >
                      Delete
                    </button>
                  </li>
                </menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        open={isOpen}
        postTitle={selectedPost?.title ?? ""}
        onCancel={closeDeleteDialog}
        onConfirm={() => handleDeletePost(selectedPost?.id)}
      />
    </div>
  );
}
