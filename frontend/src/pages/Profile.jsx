import { useEffect, useState } from "react";
import { Container, Typography, Box, Avatar, Paper, CircularProgress, Grid } from "@mui/material";
import PostCard from "../components/PostCard";
import API from "../api/axios";
import BottomNav from "../components/BottomNav";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUserPosts = async () => {
    try {
      // For simplicity, we fetch all and filter or add a backend route
      // Let's assume we use the existing GET /posts and filter for now
      // (In a real app, GET /posts/user/:userId is better)
      const res = await API.get("/posts?limit=100");
      const userPosts = res.data.posts.filter((p) => p.userId === user?.userId);
      setPosts(userPosts);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ pb: 10, pt: 4 }}>
      <Paper elevation={1} sx={{ p: 4, textAlign: "center", borderRadius: 4, mb: 4, background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)", color: "white" }}>
        <Avatar 
            sx={{ width: 100, height: 100, margin: "auto", mb: 2, border: "4px solid white", fontSize: "3rem", bgcolor: "white", color: "#1976d2" }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          {user?.username}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {posts.length} Posts • {user?.email || "User Profile"}
        </Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Your Posts
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          You haven't posted anything yet.
        </Typography>
      ) : (
        <Box>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onUpdate={fetchUserPosts} />
          ))}
        </Box>
      )}

      <BottomNav />
    </Container>
  );
}

export default Profile;
