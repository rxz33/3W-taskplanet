import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Paper, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      // Backend returns { result, token }
      localStorage.setItem("user", JSON.stringify({ 
          token: res.data.token,
          username: res.data.result.username,
          userId: res.data.result._id
      }));

      navigate("/feed");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join our community today
          </Typography>
          
          <form onSubmit={handleSignup}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 45, fontWeight: "bold" }}
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <MuiLink component={Link} to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </MuiLink>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Signup;