import asyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

const allContacts = asyncHandler(async (req, res) => {
  let contacts = await Contact.find();
  res.json(contacts);
});

export { allContacts };
