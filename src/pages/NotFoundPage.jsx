import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you're looking for doesn't exist, was moved, or never existed
        in the first place.
      </p>
      <Link className="button outline" to="/">
        Go home
      </Link>
    </>
  );
}
