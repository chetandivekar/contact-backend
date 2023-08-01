import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
