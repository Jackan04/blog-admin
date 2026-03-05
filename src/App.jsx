import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Sidebar from "./components/Sidebar";
import SigninPage from "./pages/auth/signin";
import CreatePostPage from "./pages/CreatePostPage";
import ProtectedRoute from "./services/ProtectedRoute";
import Post from "./components/Post";
import { useAuth } from "./context/authContext";

function App() {
  const { signedIn } = useAuth();
  return (
    <div key={signedIn ? "authenticated" : "guest"} data-sidebar-layout>
      <Sidebar />
      <main>
        <div className="container">
          <Routes>
            <Route path="/auth/login" element={<SigninPage />} />
            <Route path="/auth/signup" element={<h2>Sign up</h2>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/posts/create" element={<CreatePostPage />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/posts/:postId/comments"
                element={<h2>Post comments</h2>}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
