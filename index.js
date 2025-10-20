const express = require("express");
let msql = require("mysql2");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = msql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysqlaku123",
  database: "biodata",
  port: 3308,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected successfully to database");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * from mahasiswa", (err, results) => {
    if (err) {
      console.error("Error executing query:" + err.stack);
      res.status(500).send("error ferching user");
      return;
    }
    res.json(results);
  });
});

app.post("/api/users", (req, res) => {
  const { nama, nim, kelas } = req.body;

  if (!nama || !nim || !kelas) {
    return res
      .status(400)
      .json({ message: "Nama, NIM, dan Kelas wajin diisi." });
  }

  db.query(
    "INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)",
    [nama, nim, kelas],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User created successfully" });
    }
  );
});

app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { nama, nim, kelas } = req.body;
  db.query(
    "UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?",
    [nama, nim, kelas, userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "User updated successfully" });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM mahasiswa WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "User deleted successfully" });
  });
});
