import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import BlogService from "../services/blogService";
import { useParams } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

export default function UpdatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadPost() {
      const service = new BlogService();
      setLoading(true);

      try {
        const post = await service.getPostById(id);
        setTitle(post?.title);
        setContent(post?.content);
        setPublished(post?.published);
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleEditorChange(value) {
    setContent(value);
  }

  function handlePublishedChange(event) {
    setPublished(event.target.checked);
  }

  async function handleSubmit(event) {
    const service = new BlogService();
    event.preventDefault();

    try {
      await service.updatePostById(id, { title, content, published });
      navigate("/");
    } catch (error) {
      setApiError(error.message);
      setValidationErrors(error.validationErrors ?? null);
    }
  }

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {apiError && <p>{apiError}</p>}
      {validationErrors && (
        <ul>
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <label data-field htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <label data-field htmlFor="content">
        Content
        <Editor
          apiKey="0h01p07xrvj9fg4fu5e30d5jxea1jbp9wv8rruz1d0687n70"
          id="content"
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            menubar: false,
            plugins: "lists link code",
            toolbar:
              "undo redo | blocks | bold italic | bullist numlist | link | code",
            height: 300,
          }}
        />
      </label>
      <div>
        <label data-field htmlFor="published">
          <input
            type="checkbox"
            id="published"
            name="published"
            role="switch"
            checked={published}
            onChange={handlePublishedChange}
          />
          Publish
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
