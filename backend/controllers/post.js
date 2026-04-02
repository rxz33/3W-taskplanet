import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const likePost = async (req, res) => {
  const { username } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(username)) {
    post.likes.push(username);
  } else {
    post.likes = post.likes.filter((u) => u !== username);
  }

  await post.save();
  res.json(post);
};

export const commentPost = async (req, res) => {
  const { username, comment } = req.body;

  const post = await Post.findById(req.params.id);

  post.comments.push({ username, comment });

  await post.save();

  res.json(post);
};