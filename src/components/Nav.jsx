import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { signedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth/login");
  }

  return (
    <header>
      <div className=" hstack justify-between items-center">
        <h3>Blog Admin</h3>

        <nav aria-label="Main navigation">
          <ul className="hstack gap-2">
            {signedIn ? (
              <menu className="buttons">
                <li>
                  <NavLink
                    className="button outline"
                    to="/"
                    end
                    title="Go to dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="button outline"
                    to="/posts/create"
                    title="Create a new post"
                  >
                    New Post
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="outline sm"
                    type="button"
                    title="Sign out of your account"
                  >
                    Logout
                  </button>
                </li>
              </menu>
            ) : (
              <menu className="buttons">
                <li>
                  <NavLink
                    className="button"
                    to="/auth/login"
                    title="Go to sign in"
                  >
                    Sign In
                  </NavLink>
                </li>
              </menu>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
