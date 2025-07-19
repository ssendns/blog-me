const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db");
const dotenv = require("dotenv");
const AUTHOR_SECRET = process.env.AUTHOR_SECRET_CODE;

const signUp = async (req, res) => {
  const { username, password, isAuthor, authorCode } = req.body;
  const role = isAuthor && authorCode === AUTHOR_SECRET ? "AUTHOR" : "READER";

  if (!username || !password) {
    return res.status(400).json({ error: "missing fields" });
  }

  if (isAuthor && authorCode !== AUTHOR_SECRET) {
    return res.status(403).json({ error: "invalid author code" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: hashedPassword,
      role,
    },
  });

  res
    .status(201)
    .json({ user: { id: user.id, username: user.username, role: user.role } });
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ error: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: "invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({ token, role: user.role, username: user.username });
};

const getProfile = async (req, res) => {
  const userId = req.user.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(user);
};

module.exports = { signUp, logIn, getProfile };
