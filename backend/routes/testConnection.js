// backend/routes/testConnection.js
const db = require('../mysql/db');
db.end(); // Will close the connection after testing
