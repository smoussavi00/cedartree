const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/pixi.js", (req, res) => {
    res.sendFile(path.join(__dirname, '/pixi.js'));
});

app.get("/query.js", (req, res) => {
  res.sendFile(path.join(__dirname, '/query.js'));
}); 

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.get("/EudoxusSans-ExtraBold.ttf", (req, res) => {
    res.sendFile(path.join(__dirname, '/EudoxusSans-ExtraBold.ttf'));
});

app.get("/EudoxusSans-Medium.ttf", (req, res) => {
  res.sendFile(path.join(__dirname, '/EudoxusSans-Medium.ttf'));
});

app.get("/logom12.png", (req, res) => {
  res.sendFile(path.join(__dirname, '/logom12.png'));
});




