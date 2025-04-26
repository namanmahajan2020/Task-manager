// backend/controllers/UserMySQLController.js
const db = require('../mysql/db');
const jwt = require('jsonwebtoken');

const googleSignIn = (req, res) => {
  const { name, email, phone_no1, phone_no2 } = req.body;

  const checkQuery = 'SELECT * FROM Users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign({ userId: user.user_id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
      return res.status(200).json({ message: 'User already exists', token, user });
    }

    const insertQuery = 'INSERT INTO Users (name, email, phone_no1, phone_no2) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, email, phone_no1, phone_no2], (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Error creating user' });
      }

      const newUser = {
        user_id: result.insertId,
        name,
        email,
        phone_no1,
        phone_no2,
      };

      const token = jwt.sign({ userId: newUser.user_id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });
      return res.status(201).json({ message: 'User created', token, user: newUser });
    });
  });
};

module.exports = { googleSignIn };
