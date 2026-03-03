import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<App />} />
        <Route path="/posts/:postId/comments" element={<App />} />
        <Route path="/posts/create" element={<App />} />
        <Route path="/auth/login" element={<App />} />
        <Route path="/auth/signup" element={<App />} />
      </Routes>
    </div>
  );
}

export default App;
