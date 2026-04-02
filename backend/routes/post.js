import express from "express";
import { createPost, getPosts, likePost, commentPost, deletePost } from "../controllers/post.js";
import auth from "../middleware/auth.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, upload.single("image"), createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/like", auth, likePost);
router.patch("/:id/comment", auth, commentPost);

export default router;