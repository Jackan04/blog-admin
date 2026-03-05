import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Nav from "./components/Nav";
import SigninPage from "./pages/auth/signin";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProtectedRoute from "./services/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { signedIn } = useAuth();
  return (
    <div className="container" key={signedIn ? "authenticated" : "guest"}>
      <Nav />
      <main className=" mt-6">
        <Routes>
          <Route path="/auth/login" element={<SigninPage />} />
          <Route path="/auth/signup" element={<h2>Sign up</h2>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route path="/posts/create" element={<CreatePostPage />} />
            <Route path="/posts/update/:id" element={<UpdatePostPage />} />
            <Route
              path="/posts/:postId/comments"
              element={<h2>Post comments</h2>}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
