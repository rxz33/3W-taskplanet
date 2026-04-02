import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { text, username } = req.body;
    let imagePath = req.body.image; // fallback for current URL logic

    if (req.file) {
        imagePath = req.file.filename;
    }
    
    // Ensure at least one is present
    if (!text && !imagePath) {
        return res.status(400).json({ message: "Post must have text or an image." });
    }

    const post = await Post.create({
        userId: req.userId,
        username,
        text,
        image: imagePath
    });
    
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const skip = (page - 1) * limit;
    
    const total = await Post.countDocuments();
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip(skip);

    res.json({
        posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
      const { id } = req.params;
      const { username } = req.body; // or fetch from user model using req.userId

      if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

      const post = await Post.findById(id);
      
      const index = post.likes.findIndex((u) => u === String(username));

      if (index === -1) {
        post.likes.push(username);
      } else {
        post.likes = post.likes.filter((u) => u !== String(username));
      }

      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
      res.json(updatedPost);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
      const { id } = req.params;
      const { username, comment } = req.body;

      const post = await Post.findById(id);

      post.comments.push({ username, comment, createdAt: new Date() });

      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

      res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        // Check ownership
        if (post.userId !== req.userId) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};