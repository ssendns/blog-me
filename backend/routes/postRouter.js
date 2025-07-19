const express = require("express");
const router = express.Router();
const {
  createPost,
  getPublishedPosts,
  getPostById,
  togglePublish,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/my-posts", authMiddleware, getMyPosts);
router.get("/public/:id", getPostById);
router.get("/:id", authMiddleware, getPostById);
router.patch("/:id/publish", authMiddleware, togglePublish);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/", authMiddleware, createPost);
router.get("/", getPublishedPosts);

module.exports = router;
