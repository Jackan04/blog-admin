import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<App />} />
        <Route path="/post/:id" element={<App />} />
        <Route path="/posts/:postId/comments" element={<App />} />
        <Route path="/posts/create" element={<App />} />
        
        
        <Route path="auth" element={<App />}>
          <Route path="/login" element={<App />} />
          <Route path="/signup" element={<App />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
