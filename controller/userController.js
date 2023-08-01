import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avtar } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    avtar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avtar: user.avtar,
      token: generateToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error("user not found");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avtar: user.avtar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("username or password does not matched");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    res.status(400);
    throw new Error("No users found");
  }

  const userArray = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      avtar: user.avtar,
    };
  });
  res.status(200).json(userArray);
});

const oneUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avtar: user.avtar,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid ID");
  }
});

export { registerUser, loginUser, allUsers, oneUser };
