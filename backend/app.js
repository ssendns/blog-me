const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const prisma = require("config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
