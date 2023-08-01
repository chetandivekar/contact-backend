import express from "express";
import { allContacts } from "../controller/contactController.js";

const router = express.Router();

router.route("/").get(allContacts);

export default router;
