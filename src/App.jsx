import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Projectboard from "./pages/Projectboard";
import Sprints from "./pages/Sprints";
import Boards from "./pages/Boards";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-board" element={<Projectboard />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/boards" element={<Boards />} />
      </Routes>
    </>
  );
}

export default App;
