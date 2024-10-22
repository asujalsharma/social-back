// backend/routes/userRoutes.js
const express = require('express');
const multer = require('multer');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('images', 10), createUser);  // Limit to 10 images
router.get('/', getAllUsers);

module.exports = router;
