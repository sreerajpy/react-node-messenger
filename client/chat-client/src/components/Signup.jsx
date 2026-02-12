import { useState } from "react";
import { signup } from "../api/auth.api";
import { useNavigate } from "react-router-dom"; // For automatic redirect

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // New: Status state to handle object { type: 'error' | 'success', message: string }
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus(null); // Reset status on new attempt

    if (!username || !password) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      await signup({ username, password });
      setStatus({ type: "success", message: "Account created! Redirecting to login..." });

      // Modern touch: Redirect user automatically after 2 seconds
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      // Better error handling: use message from server if it exists
      const errorMsg = error.response?.data?.message || "Signup failed. Try a different username.";
      setStatus({ type: "error", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join our community today</p>
        </div>

        {/* Dynamic Status Message */}
        {status && (
          <div style={{
            ...styles.alert,
            backgroundColor: status.type === "success" ? "#ECFDF5" : "#FEF2F2",
            color: status.type === "success" ? "#059669" : "#DC2626",
            border: `1px solid ${status.type === "success" ? "#A7F3D0" : "#FECACA"}`
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
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
            style={{
              ...styles.button,
              backgroundColor: loading ? "#93C5FD" : "#007AFF",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  // ... (keep previous styles)
  alert: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "500",
  },
  // Update button to handle loading color
  button: {
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    transition: "all 0.2s ease",
  },
  // Include existing container, card, form, input styles from previous response
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#F8F9FA" },
  card: { backgroundColor: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px" },
  header: { textAlign: "center", marginBottom: "20px" },
  title: { fontSize: "24px", fontWeight: "700", margin: "0" },
  subtitle: { color: "#666", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "14px", fontWeight: "500" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #E0E0E0", outline: "none" }
};