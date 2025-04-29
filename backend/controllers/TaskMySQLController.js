// backend/controllers/TaskMySQLController.js
const db = require('../mysql/db');

const calculatePriority = (dueDate) => {
  const currentDate = new Date();
  const taskDueDate = new Date(dueDate);

  const diffTime = taskDueDate - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert time difference to days

  // Set priority based on the difference in days
  if (diffDays <= 2) {
    return 'high';
  } else if (diffDays <= 7) {
    return 'medium';
  } else {
    return 'low';
  }
};

const addTask = (req, res) => {
  const { title, created_by, team_id, due_date } = req.body;

  // Calculate priority based on due date
  const priority = calculatePriority(due_date);
  
  // Set default status to 'pending'
  const status = 'pending';

  // Log the received data for debugging
  console.log('Received task data:', { title, created_by, team_id, due_date, priority, status });

  // SQL query to insert task into the database
  const insertQuery = 'INSERT INTO Tasks (title, created_by, team_id, due_date, priority, status) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(insertQuery, [title, created_by, team_id, due_date, priority, status], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Log the inserted task ID
    console.log('Task inserted with ID:', result.insertId);

    const newTask = {
      task_id: result.insertId,
      title,
      created_by,
      team_id,
      due_date,
      priority,
      status,
    };

    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  });
};

module.exports = { addTask };
