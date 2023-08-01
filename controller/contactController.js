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

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { fname, lname, email, number } = req.body;
  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    throw new Error("You can't perform the action");
  }
  if (contact) {
    contact.fname = fname;
    contact.lname = lname;
    contact.email = email;
    contact.number = number;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    throw new Error("contact not found");
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user._id.toString()) {
    throw new Error("You can't perform the action");
  }
  if (contact) {
    await contact.deleteOne();
    res.status(201).json("Contact Removed");
  } else {
    throw new Error("contact not found");
  }
});

export {
  allContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
