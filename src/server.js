const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/tree.js", (req, res) => {
    res.sendFile(path.join(__dirname, '/tree.js'));
});

app.get("/pixi.min.js", (req, res) => {
    res.sendFile(path.join(__dirname, '/pixi.min.js'));
});

app.get("/LibreBaskerville-Regular.otf", (req, res) => {
    res.sendFile(path.join(__dirname, '/LibreBaskerville-Regular.otf'));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'));
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});