import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogService from "../services/blogService";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handlePublishedChange(event) {
    setPublished(event.target.checked);
  }
  async function handleSubmit(event) {
    const service = new BlogService();
    event.preventDefault();
    setApiError(null);
    setValidationErrors(null);

    try {
      await service.createPost({ title, content, published });
      navigate("/");
    } catch (error) {
      setApiError(error.message);
      setValidationErrors(error.validationErrors ?? null);
    }
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
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={handleContentChange}
          required
        />
      </label>
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

      <button type="submit">Create</button>
    </form>
  );
}
