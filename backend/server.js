require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(require("cors")()); // Enable CORS

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// Test API Route
// Fetch all users
app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.post("/api/users", (req, res) => {
    console.log("Received Data:", req.body);

    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Missing name or email" });
    }

    const query = "INSERT INTO Users (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)";
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            console.log("✅ User added/updated:", { name, email });
            res.json({ message: "User added/updated successfully" });
        }
    });
});
