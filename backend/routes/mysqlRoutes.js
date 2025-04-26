// backend/routes/mysqlRoutes.js
const express = require('express');
const router = express.Router();
const { googleSignIn } = require('../controllers/UserMySQLController');
const { addTask } = require('../controllers/TaskMySQLController');

// Route to handle Google sign-in
router.post('/users/google-signin', googleSignIn);

// Route to add a new task
router.post('/tasks/add', addTask);

module.exports = router;
