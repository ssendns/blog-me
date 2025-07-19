const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
