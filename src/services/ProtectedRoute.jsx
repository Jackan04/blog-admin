import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return (
      <article className="card">
        <header>
          <h3>Authentication Required</h3>
          <p>Please sign in to continue</p>
        </header>
        <footer className="flex gap-2 mt-4">
          <Link
            className="button outline"
            to="/auth/login"
            title="Go to sign in"
          >
            Sign In
          </Link>
        </footer>
      </article>
    );
  }

  return <Outlet />;
}
