import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import BlogService from "../services/blogService";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

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
