// backend/controllers/TaskMySQLController.js
const db = require('../mysql/db');

const addTask = (req, res) => {
  const { title, created_by, team_id, due_date, priority } = req.body;

  const insertQuery = 'INSERT INTO Tasks (title, created_by, team_id, due_date, priority) VALUES (?, ?, ?, ?, ?)';
  db.query(insertQuery, [title, created_by, team_id, due_date, priority], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    const newTask = {
      task_id: result.insertId,
      title,
      created_by,
      team_id,
      due_date,
      priority,
    };

    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  });
};

module.exports = { addTask };
