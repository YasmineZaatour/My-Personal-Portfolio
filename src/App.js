import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Components/NavBar/NavBar";
import Home from "./Components/HomePage/HomePage";
import Intro from "./Components/Intro/Intro";
import Experience from "./Components/Timeline/Experience";
import Skills from "./Components/skills/Skills";
import Portfolio from "./Components/Portfolio/Portfolio";
import Certifications from "./Components/Certifications/Certifications";
import Contact from "./Components/Contact/Contact";
import SignIn from './Components/Admin_Dashboard/SignIn/SignIn';
import SignUp from './Components/Admin_Dashboard/SignUp/SignUp';
import "./App.css";
import Title from "./Components/Admin_Dashboard/Title/Title";
import AdminDashboard from "./Components/Admin_Dashboard/AdminDashboard/AdminDashboard";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminVerification from "./Components/Admin_Dashboard/AdminVerification/AdminVerification";

// Portfolio Layout Component
const PortfolioLayout = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Intro />
      <Skills />
      <Experience />
      <Portfolio />
      <Certifications />
      <Contact />
    </>
  );
};

// Admin Layout Component
const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Title />
      <div className="admin-content">
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="admin-verification" element={<AdminVerification />} />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PortfolioLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;