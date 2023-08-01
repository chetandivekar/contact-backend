import express from "express";
import { allContacts, createContact } from "../controller/contactController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(authMiddleware, allContacts);
router.route("/createContact").post(authMiddleware, createContact);

export default router;
