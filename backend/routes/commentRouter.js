const express = require("express");
const router = express.Router();
const {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const authMiddlewareOptional = require("../middlewares/authMiddlewareOptional");

router.get("/posts/:id/comments", getCommentsByPost);
router.post("/posts/:id/comments", authMiddlewareOptional, addComment);
router.put("/comments/:id", authMiddleware, updateComment);
router.delete("/comments/:id", authMiddleware, deleteComment);

module.exports = router;
