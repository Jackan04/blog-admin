import { NavLink } from "react-router-dom";
import BlogService from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { signedIn } = useAuth();
  const service = new BlogService();
  const navigate = useNavigate();

  function handleLogout() {
    service.logout();
    navigate("/auth/login");
  }

  return (
    <aside data-sidebar>
      <header>
        <h3>Blog Admin</h3>
      </header>

      <nav>
        <ul>
          <li>
            <NavLink to="/posts/create">New Post</NavLink>
          </li>
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          {!signedIn && <NavLink to="/auth/login">Sign In</NavLink>}
        </ul>
      </nav>

      <footer>
        {signedIn && (
          <button
            onClick={handleLogout}
            className="outline sm"
            style={{ width: "100%" }}
            type="button"
          >
            Logout
          </button>
        )}
      </footer>
    </aside>
  );
}
