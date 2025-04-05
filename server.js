const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname,'public','login.html'));
});

app.get('/main', (req,res) => {
    res.sendFile(path.join(__dirname,'public','main.html'));
});

app.get('/create', (req,res) => {
    res.sendFile(path.join(__dirname,'public','create.html'));
});

app.get('/forgot', (req,res) => {
    res.sendFile(path.join(__dirname,'public','forgot.html'));
});

app.get('/change', (req,res) => {
    res.sendFile(path.join(__dirname,'public','change.html'));
});

app.get('/settings', (req,res) => {
    res.sendFile(path.join(__dirname,'public','settings.html'));
});

app.get('/delete', (req,res) => {
    res.sendFile(path.join(__dirname,'public','delete.html'));
});

app.get('/verify', (req,res) => {
    res.sendFile(path.join(__dirname,'public','verify.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://amusawi:tiat650TI@cedarcluster.f2ukivh.mongodb.net/?retryWrites=true&w=majority&appName=cedarcluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/