import { useState } from "react";
import { Container, TextField, Button, Box, Typography, Paper, IconButton } from "@mui/material";
import { ArrowBack, PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import BottomNav from "../components/BottomNav";

function CreatePostPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!text && !image) return alert("Write something or add an image!");

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("text", text);
    if (image) {
        formData.append("image", image);
    }

    try {
      await API.post("/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/feed");
    } catch (err) {
      alert("Post failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pb: 10, pt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/feed")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" sx={{ ml: 1 }}>
          Create Post
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="standard"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 3, fontSize: "1.1rem" }}
          InputProps={{ disableUnderline: true }}
        />

        <Box sx={{ mb: 3 }}>
            <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<PhotoCamera />}
                sx={{ height: 50, borderRadius: 2, borderStyle: "dashed" }}
            >
                {image ? "Change Photo" : "Upload Photo"}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Button>
        </Box>

        {preview && (
            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Preview:</Typography>
                <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
            </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handlePost}
          sx={{ borderRadius: 10, height: 50, fontWeight: "bold" }}
        >
          POST
        </Button>
      </Paper>

      <BottomNav />
    </Container>
  );
}

export default CreatePostPage;
