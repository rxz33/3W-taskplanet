import { useState } from "react";
import API from "../api/axios";

function CreatePost({ fetchPosts }) {
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePost = async () => {
    if (!text) return alert("Write something");

    await API.post("/posts", {
      userId: user._id,
      username: user.username,
      text,
    });

    setText("");
    fetchPosts();
  };

  return (
    <div style={{ background: "white", padding: 20, marginBottom: 20 }}>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default CreatePost;