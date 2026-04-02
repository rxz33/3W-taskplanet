import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  commentPost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id/like", likePost);
router.put("/:id/comment", commentPost);

export default router;