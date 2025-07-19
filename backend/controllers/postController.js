const prisma = require("../config/db");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error("error while creating a post:", err);
    res.status(500).json({ error: "failed to create post" });
  }
};

const getPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { username: true } } },
    });
    res.json(posts);
  } catch (err) {
    console.error("error while getting posts:", err);
    res.status(500).json({ error: "failed to get posts" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: { select: { username: true } } },
  });

  if (!post || (!post.published && post.authorId !== req.user?.userId)) {
    return res.status(404).json({ error: "post not found" });
  }

  res.json(post);
};

const togglePublish = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post || post.authorId !== userId) {
    return res.status(403).json({ error: "not your post" });
  }

  const updated = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: !post.published },
  });

  res.json(updated);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post || post.authorId !== userId) {
    return res.status(403).json({ error: "not your post" });
  }

  const updated = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, content },
  });

  res.json(updated);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post || post.authorId !== userId) {
    return res.status(403).json({ error: "not your post" });
  }

  await prisma.post.delete({ where: { id: Number(id) } });
  res.json({ message: "post deleted" });
};

module.exports = {
  createPost,
  getPublishedPosts,
  getPostById,
  togglePublish,
  updatePost,
  deletePost,
};
