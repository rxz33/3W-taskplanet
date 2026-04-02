import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, CircularProgress, Paper, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import PostCard from "../components/PostCard";
import API from "../api/axios";
import BottomNav from "../components/BottomNav";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async (page = 1) => {
    try {
      const res = await API.get(`/posts?page=${page}&limit=5`);
      setPosts(res.data.posts);
      setNumberOfPages(res.data.numberOfPages);
      setCurrentPage(res.data.currentPage);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      fetchPosts(1);
    }
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ pb: 10, pt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="#1976d2">
              TaskPlanet Social
          </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary">
                No posts yet. Be the first to share something!
            </Typography>
            <Button 
                variant="contained" 
                startIcon={<Add />}
                sx={{ mt: 2 }}
                onClick={() => navigate("/create-post")}
            >
                Create First Post
            </Button>
        </Paper>
      ) : (
        <Box>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onUpdate={() => fetchPosts(currentPage)} />
          ))}

          {/* Pagination Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
              <Button 
                disabled={currentPage === 1} 
                onClick={() => fetchPosts(currentPage - 1)}
              >
                Previous
              </Button>
              <Typography sx={{ alignSelf: "center" }}>
                  Page {currentPage} of {numberOfPages}
              </Typography>
              <Button 
                disabled={currentPage === numberOfPages} 
                onClick={() => fetchPosts(currentPage + 1)}
              >
                Next
              </Button>
          </Box>
        </Box>
      )}

      {/* Floating Action Button for Create Post (Mobile) */}
      <Fab 
        color="primary" 
        sx={{ position: "fixed", bottom: 85, right: 20 }}
        onClick={() => navigate("/create-post")}
      >
        <Add />
      </Fab>

      <BottomNav />
    </Container>
  );
}

export default Feed;