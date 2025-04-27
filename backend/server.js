require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");


const app = express();
const mysqlRoutes = require('./routes/mysqlRoutes'); // Import MySQL routes
const cors = require('cors'); // CORS setup

app.use(express.json()); // Middleware to parse JSON

app.use(cors({
    origin: 'http://localhost:5173',  // Allow only your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
    credentials: true,  // Allow cookies if needed
  }));

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

    const query = "INSERT INTO users (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)";
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

app.use(require("cors")()); // Enable CORS

// Use the MySQL routes
app.use('/api/mysql', cors(), mysqlRoutes);

// Add Task API route in server.js
app.post("/api/tasks", (req, res) => {
    const { title, due_date, priority, created_by, team_id } = req.body;

    if (!title || !created_by) {
        return res.status(400).json({ error: "Missing task title or created_by" });
    }

    const query = "INSERT INTO Tasks (title, due_date, priority, created_by, team_id) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [title, due_date, priority, created_by, team_id], (err, result) => {
        if (err) {
            console.error("Error inserting task:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.status(200).json({ message: "Task added successfully", taskId: result.insertId });
        }
    });
});

const { getAuthURL, setTokens, createEvent } = require("./googleCalendar");

app.get("/auth-url", (req, res) => {
  const url = getAuthURL();
  res.send({ url });
});

app.post("/auth-code", async (req, res) => {
  const { code } = req.body;
  const tokens = await setTokens(code);
  res.send(tokens);
});

app.post("/create-event", async (req, res) => {
  const { summary, description, startDateTime, endDateTime } = req.body;
  try {
    const result = await createEvent(summary, description, startDateTime, endDateTime);
    res.send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
});

app.post("/api/check-calendar-access", (req, res) => {
    const { email } = req.body;
    db.query("SELECT tokens FROM CalendarTokens WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ hasAccess: results.length > 0 });
    });
});

app.post("/auth-code", async (req, res) => {
    const { code, email } = req.body;
    const tokens = await setTokens(code);

    db.query(
        "INSERT INTO CalendarTokens (email, tokens) VALUES (?, ?) ON DUPLICATE KEY UPDATE tokens = VALUES(tokens)",
        [email, JSON.stringify(tokens)],
        (err) => {
            if (err) {
                console.error("DB error saving tokens:", err);
                return res.status(500).send("Token storage failed");
            }
            res.send({ message: "Tokens stored" });
        }
    );
});

app.get("/check-calendar-access/:email", (req, res) => {
    const { email } = req.params;

    // Logic to check if calendar access exists (you might use a database to store tokens)
    const hasAccess = checkIfUserHasCalendarTokens(email);
    res.json({ hasAccess });
});

app.get("/auth-url", (req, res) => {
    const url = getAuthURL();
    res.send({ url });
});


// Add Team API route in server.js
app.post("/api/teams", (req, res) => {
    const { name, created_by } = req.body;
  
    console.log("Received team data:", req.body); // Log the received data
  
    if (!name || !created_by) {
      return res.status(400).json({ error: "Missing team name or creator ID" });
    }
  
    const query = "INSERT INTO Teams (name, created_by) VALUES (?, ?)";
    db.query(query, [name, created_by], (err, result) => {
      if (err) {
        console.error("Error inserting team:", err); // Log the error
        return res.status(500).json({ error: "Database error" });
      } else {
        console.log("Team created successfully:", result); // Log the successful result
        res.status(200).json({ message: "Team created successfully", teamId: result.insertId });
      }
    });
  });
  