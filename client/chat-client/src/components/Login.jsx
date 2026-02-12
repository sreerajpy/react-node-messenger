import { useState } from "react";
import { login } from "../api/auth.api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Standard practice for forms
    if (!username || !password) return;

    setIsSubmitting(true);
    try {
      const res = await login({ username, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Password</label>
              <span style={styles.forgotLink}>Forgot?</span>
            </div>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            style={{...styles.button, opacity: isSubmitting ? 0.7 : 1}}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? <span style={styles.link}>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F3F4F6", // Neutral light background
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    width: "100%",
    maxWidth: "380px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
    margin: "0 0 10px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6B7280",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#2563EB",
    cursor: "pointer",
    fontWeight: "500",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#111827", // Modern dark mode button
    color: "white",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s",
  },
  footer: {
    marginTop: "25px",
    borderTop: "1px solid #F3F4F6",
    paddingTop: "20px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#4B5563",
  },
  link: {
    color: "#2563EB",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  }
};