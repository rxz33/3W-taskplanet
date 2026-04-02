import API from "../api/axios";

function PostCard({ post, fetchPosts }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLike = async () => {
    await API.patch(`/posts/${post._id}/like`, {
      username: user.username,
    });
    fetchPosts();
  };

  const handleComment = async () => {
    const comment = prompt("Enter comment");

    await API.patch(`/posts/${post._id}/comment`, {
      username: user.username,
      comment,
    });

    fetchPosts();
  };

  return (
    <div style={{ background: "white", padding: 20, marginBottom: 20 }}>
      <h4>{post.username}</h4>
      <p>{post.text}</p>

      <div>
        ❤️ {post.likes.length}
        <button onClick={handleLike}>Like</button>
      </div>

      <div>
        💬 {post.comments.length}
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  );
}

export default PostCard;