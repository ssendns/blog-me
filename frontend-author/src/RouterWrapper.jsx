import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
// import AuthorHome from "./pages/AuthorHome";
// import CreatePost from "./pages/CreatePost";
// import EditPost from "./pages/EditPost";

/*
        <Route path="/" element={<AuthorHome />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
