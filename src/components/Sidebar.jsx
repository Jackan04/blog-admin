import { NavLink, Link } from "react-router-dom";

export default function Sidebar() {
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
        </ul>
      </nav>

      <footer>
        <button className="outline sm" style={{ width: "100%" }} type="button">
          Logout
        </button>
      </footer>
    </aside>
  );
}
