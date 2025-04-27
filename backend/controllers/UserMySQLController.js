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

// Fetch user details by ID
const getUserById = (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT user_id, name, email, phone_no1, phone_no2 FROM Users WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Update mobile numbers
const updateMobileNumbers = (req, res) => {
  const userId = req.params.id;
  const { phone_no1, phone_no2 } = req.body;

  const updateQuery = 'UPDATE Users SET phone_no1 = ?, phone_no2 = ? WHERE user_id = ?';
  db.query(updateQuery, [phone_no1, phone_no2, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Mobile numbers updated successfully' });
  });
};

module.exports = { googleSignIn, getUserById, updateMobileNumbers };


