// backend/controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const imagePaths = req.files.map((file) => file.filename);
    const newUser = new User({ name, socialHandle, images: imagePaths });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
