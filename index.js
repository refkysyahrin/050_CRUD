const express = require("express");
let msql = require("mysql");
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
