import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import VideoEdit from "./pages/VideoEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video/edit/:id" element={<VideoEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
