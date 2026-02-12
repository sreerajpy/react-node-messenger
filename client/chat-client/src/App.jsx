import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Synchronize state if localStorage changes in other tabs
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Simple Navbar for Unauthenticated Users */}
        {!isAuthenticated && (
          <nav style={styles.nav}>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/signup" style={styles.navLink}>Sign Up</Link>
          </nav>
        )}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/chat" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/chat" />}
          />

          {/* Protected Route */}
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat onLogout={handleLogout} /> : <Navigate to="/login" />}
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#F3F4F6",
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  navLink: {
    textDecoration: "none",
    color: "#4B5563",
    fontWeight: "600",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  }
};

export default App;