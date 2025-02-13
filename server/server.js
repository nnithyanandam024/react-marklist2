const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Database setup
const db = require("./db");

// GET all marks
app.get("/marks", (req, res) => {
  const query = "SELECT * FROM marks";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching marks:", err);
      res.status(500).send("Error fetching marks.");
      return;
    }
    res.json(results);
  });
});

// POST a new mark entry
app.post("/marks", (req, res) => {
  const { subject1, subject2, subject3, subject4, subject5 } = req.body;
  const query =
    "INSERT INTO marks (subject1, subject2, subject3, subject4, subject5) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [subject1, subject2, subject3, subject4, subject5],
    (err, result) => {
      if (err) {
        console.error("Error adding mark entry:", err);
        res.status(500).send("Error adding mark entry.");
        return;
      }
      res.json({
        id: result.insertId,
        subject1,
        subject2,
        subject3,
        subject4,
        subject5,
      });
    }
  );
});

// PUT to update a mark entry
app.put("/marks/:id", (req, res) => {
  const { subject1, subject2, subject3, subject4, subject5 } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE marks SET subject1 = ?, subject2 = ?, subject3 = ?, subject4 = ?, subject5 = ? WHERE id = ?";
  db.query(
    query,
    [subject1, subject2, subject3, subject4, subject5, id],
    (err, result) => {
      if (err) {
        console.error("Error updating mark entry:", err);
        res.status(500).send("Error updating mark entry.");
        return;
      }
      res.send("Mark entry updated successfully.");
    }
  );
});

// DELETE a mark entry
app.delete("/marks/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM marks WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting mark entry:", err);
      res.status(500).send("Error deleting mark entry.");
      return;
    }
    res.send("Mark entry deleted successfully.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
