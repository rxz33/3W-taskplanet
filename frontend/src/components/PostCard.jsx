import { Card, CardHeader, CardContent, CardActions, CardMedia, Avatar, Typography, IconButton, Box } from "@mui/material";
import { Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from "@mui/icons-material";
import API, { BASE_URL } from "../api/axios";

function PostCard({ post, onUpdate }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.userId === post.userId;
  const isLiked = post.likes.includes(user?.username);

  const handleLike = async () => {
    try {
      await API.patch(`/posts/${post._id}/like`, {
        username: user.username,
      });
      onUpdate(); // tells feed to re-fetch or update state
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    const comment = prompt("Enter your comment:");
    if (!comment) return;

    try {
      await API.patch(`/posts/${post._id}/comment`, {
        username: user.username,
        comment,
      });
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${post._id}`);
      onUpdate();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mb: 2, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1976d2" }}>
            {post.username?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          isOwner && (
            <IconButton onClick={handleDelete} color="error">
              <DeleteOutline />
            </IconButton>
          )
        }
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      
      {post.image && (
        <CardMedia
          component="img"
          height="300"
          image={post.image.startsWith("http") ? post.image : `${BASE_URL}/uploads/${post.image}`}
          alt="Post image"
          sx={{ objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <IconButton onClick={handleLike} color={isLiked ? "error" : "default"}>
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{post.likes?.length || 0}</Typography>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleComment}>
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2">{post.comments?.length || 0}</Typography>
        </Box>
      </CardActions>
      
      {/* Basic Comments Display */}
      {post.comments?.length > 0 && (
          <Box sx={{ p: 2, pt: 0, maxHeight: 150, overflowY: "auto" }}>
              {post.comments.slice(-3).map((c, i) => (
                  <Typography key={i} variant="caption" display="block">
                      <strong>{c.username}:</strong> {c.comment}
                  </Typography>
              ))}
          </Box>
      )}
    </Card>
  );
}

export default PostCard;