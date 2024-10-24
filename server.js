// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');



dotenv.config();
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded images
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
}));
app.use(cors());

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://social-front.vercel.app'); // Replace with your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200); // Respond with status 200 OK
});
// app.use("/",(req,res)=>{
//   res.send("Hello");
// })

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

