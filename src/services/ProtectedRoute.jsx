import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProtectedRoute() {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return (
      <article class="card">
        <header>
          <h3>Authentication Required</h3>
          <p>Please sign in to continue</p>
        </header>
        <footer class="flex gap-2 mt-4">
          <Link className="button outline" to="/auth/login">
            Sign In
          </Link>
        </footer>
      </article>
    );
  }

  return <Outlet />;
}
