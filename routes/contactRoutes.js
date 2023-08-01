import express from "express";
import {
  allContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../controller/contactController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(authMiddleware, allContacts);
router.route("/createContact").post(authMiddleware, createContact);
router
  .route("/:id")
  .get(authMiddleware, getContactById)
  .put(authMiddleware, updateContact)
  .delete(authMiddleware, deleteContact);
export default router;
