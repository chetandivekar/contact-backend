import express from "express";
import {
  registerUser,
  loginUser,
  allUsers,
  oneUser,
} from "../controller/userController.js";
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUser").get(allUsers);
router.route("/user/:id").get(oneUser);

export default router;
