const prisma = require("../config/db");

const getCommentsByPost = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(id) },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    const formatted = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      authorName: comment.user?.username || comment.authorName || "anon",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("error getting comments:", err);
    res.status(500).json({ error: "failed to fetch comments" });
  }
};

const addComment = async (req, res) => {
  const { content } = req.body;
  const { id: postId } = req.params;

  const userId = req.user?.userId || null;
  const authorName = req.user ? null : req.body.authorName;

  if (!content || (!userId && !authorName)) {
    return res.status(400).json({ error: "missing content or author name" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        authorId: userId,
        authorName,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error("error while adding comment:", err);
    res.status(500).json({ error: "failed to add a comment" });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });
  if (!comment || comment.authorId !== userId) {
    return res.status(403).json({ error: "not your comment" });
  }

  const updated = await prisma.comment.update({
    where: { id: Number(id) },
    data: { content },
  });

  res.json(updated);
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
    include: { post: true },
  });

  const isAuthor = comment.authorId === userId;
  const isPostOwner = comment.post.authorId === userId;

  if (!comment || (!isAuthor && !isPostOwner)) {
    return res.status(403).json({ error: "no permission to delete" });
  }

  await prisma.comment.delete({ where: { id: Number(id) } });
  res.json({ message: "comment deleted" });
};

module.exports = {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment,
};
