import { NavLink } from "react-router-dom";
import BlogService from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { signedIn } = useAuth();
  const service = new BlogService();
  const navigate = useNavigate();

  function handleLogout() {
    service.logout();
    navigate("/auth/login");
  }

  return (
    <header>
      <div className=" hstack justify-between items-center">
        <h3>Blog Admin</h3>

        <nav aria-label="Main navigation">
          <ul className="hstack gap-2">
            {signedIn ? (
              <>
                <menu className="buttons">
                  <li>
                    <NavLink className="button outline" to="/" end>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="button outline" to="/posts/create">
                      New Post
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="outline sm"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </menu>
              </>
            ) : (
              <li>
                <NavLink to="/auth/login">Sign In</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
