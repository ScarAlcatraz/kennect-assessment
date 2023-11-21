import express from "express";
import { addCommentToPost, createPost, getFeedPosts, getPost, searchPostsByString } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read routes
router.get("/", getFeedPosts);
router.get("/:postId", getPost);
router.post("/find", searchPostsByString);

// Create post routes
router.post("/createPost", createPost);
router.post("/:postId", addCommentToPost);

export default router;