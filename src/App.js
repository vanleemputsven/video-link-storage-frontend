import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import VideoEdit from "./pages/VideoEdit";
import Footer from "./components/Footer";
import Terms from "./pages/Terms"; 
import Privacy from "./pages/Privacy"; 
import Contact from "./pages/Contact"; 
import Favorites from "./pages/Favorites";
import AccountPage from "./pages/AccountPage";

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
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
