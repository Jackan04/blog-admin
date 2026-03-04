import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div data-sidebar-layout>
      <Sidebar />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/post/:id" element={<h2>Post details</h2>} />
            <Route
              path="/posts/:postId/comments"
              element={<h2>Post comments</h2>}
            />
            <Route path="/posts/create" element={<h2>Create post</h2>} />
            <Route path="/auth/login" element={<h2>Sign in</h2>} />
            <Route path="/auth/signup" element={<h2>Sign up</h2>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
