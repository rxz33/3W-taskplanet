import { useState } from "react";
import API from "../api/axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      // store user
      localStorage.setItem("user", JSON.stringify(res.data));

      // redirect to feed
      window.location.href = "/feed";
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSignup} style={styles.button}>
        Signup
      </button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;

const styles = {
  container: {
    maxWidth: 400,
    margin: "80px auto",
    padding: 20,
    background: "white",
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};