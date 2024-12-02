const express = require('express');
const path = require('path');
const { spawn } = require('child_process');


const app = express();
const PORT = 3000;

app.use(express.json())


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

app.get("/wordsim.py", (req, res) => {
  res.sendFile(path.join(__dirname, '/wordsim.py'));
}); 

//REMOVE THIS LATER!
app.get("/t.py", (req, res) => {
  res.sendFile(path.join(__dirname, '/t.py'));
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

app.post('/diagram', function(req, res) {

  args = ['wordsim.py'];
  args.push(''+req.body.n);
  args.push(req.body.w);
  args.push(...req.body.s);

  var sensor = spawn('python3.9', args);     
  sensor.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
});




