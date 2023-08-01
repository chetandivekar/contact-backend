import asyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

const allContacts = asyncHandler(async (req, res) => {
  let contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { fname, lname, email, number } = req.body;
  const userExist = await Contact.findOne({ number });

  if (userExist) {
    res.status(400);
    throw new Error("number already exists");
  }

  if (!fname || !number) {
    res.status(400);
    throw new Error("Please provide first name and contact number");
  } else {
    const contact = new Contact({
      fname,
      lname,
      email,
      number,
      user: req.user._id,
    });
    const createContact = await contact.save();
    res.status(201).json(createContact);
  }
});

export { allContacts, createContact };
