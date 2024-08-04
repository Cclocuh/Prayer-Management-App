const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'prayer_management_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/api/prayers', (req, res) => {
  const sql = 'SELECT * FROM prayers';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/prayers', (req, res) => {
  const newPrayer = req.body;
  const sql = 'INSERT INTO prayers SET ?';
  db.query(sql, newPrayer, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/api/prayers/:id', (req, res) => {
  const updatedPrayer = req.body;
  const sql = 'UPDATE prayers SET ? WHERE id = ?';
  db.query(sql, [updatedPrayer, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/prayers/:id', (req, res) => {
  const sql = 'DELETE FROM prayers WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

