import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogService from "../../services/blogService";

export default function SigninForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError(null);
    setValidationErrors(null);

    const service = new BlogService("POST", {
      username: username,
      password: password,
    });

    try {
      await service.login({ username, password });
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
      <label htmlFor="username">
        Username
        <input
          data-field
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          data-field
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
