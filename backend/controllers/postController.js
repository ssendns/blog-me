const prisma = require("../config/db");

const createPost = async (req, res) => {
  const { title, content, published } = req.body;
  const userId = req.user.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
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
      orderBy: { createdAt: "desc" },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      authorName: post.author?.username || "anon",
      published: post.published,
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error("error while getting posts:", err);
    res.status(500).json({ error: "failed to get posts" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!post || (!post.published && req.user?.userId !== post.authorId)) {
      return res.status(404).json({ error: "post not found" });
    }

    const commentsWithNames = post.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      authorName: comment.author?.username || comment.authorName || "anon",
      published: post.published,
    }));

    res.json({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author.username,
      comments: commentsWithNames,
    });
  } catch (err) {
    console.error("error while getting a post:", err);
    res.status(500).json({ error: "failed to get a post" });
  }
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
  const { title, content, published } = req.body;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post || post.authorId !== userId) {
    return res.status(403).json({ error: "not your post" });
  }

  const updated = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, content, published },
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

  console.log("CURRENT userId:", userId);
  console.log("POST authorId:", post?.authorId);
  console.log("POST id:", id);

  await prisma.post.delete({ where: { id: Number(id) } });
  res.json({ message: "post deleted" });
};

const getMyPosts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { username: true },
        },
      },
    });
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorName: post.author?.username || "anon",
      published: post.published,
    }));
    console.log(formattedPosts);
    res.json(formattedPosts);
  } catch (err) {
    console.error("error while getting my posts:", err);
    res.status(500).json({ error: "failed to get my posts" });
  }
};

module.exports = {
  createPost,
  getPublishedPosts,
  getPostById,
  togglePublish,
  updatePost,
  deletePost,
  getMyPosts,
};
