const express = require('express');
const session = require('express-session');
require('dotenv').config();

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const uri = process.env.DATABASE_URI;
const secret = process.env.SESSION_SECRET;

mongoose.connect(uri).catch(err => console.error('MongoDB connection error:', err));;

const uschema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passhash: { type: String, required: true },
    verified: { type: Boolean, default: false },
    code: String,
    codeexp: Date,
});

const User = mongoose.model('User',uschema,'users');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname,'public','login.html'));
});

app.get('/create', (req,res) => {
    res.sendFile(path.join(__dirname,'public','create.html'));
});

app.get('/forgot', (req,res) => {
    res.sendFile(path.join(__dirname,'public','forgot.html'));
});

app.get('/verify', (req,res) => {

    if(!req.session.email) return res.redirect('/login');
    if(req.session.verified) return res.redirect('/main');
    
    res.sendFile(path.join(__dirname,'public','verify.html'));

});

app.get('/reset', (req,res) => {
    res.sendFile(path.join(__dirname,'public','reset.html'));
});

app.get('/main', (req,res) => {
    
    if (!req.session.email) return res.redirect('/login');
    else if (!req.session.verified) return res.redirect('/verify');
    
    res.sendFile(path.join(__dirname,'public','main.html'));
});

app.get('/settings', (req,res) => {
    res.sendFile(path.join(__dirname,'public','settings.html'));
});

app.get('/delete', (req,res) => {
    res.sendFile(path.join(__dirname,'public','delete.html'));
});

app.get('/change', (req,res) => {
    res.sendFile(path.join(__dirname,'public','change.html'));
});

app.get('/api/session', (req, res) => {
    res.json({email: req.session.email || null });
});

app.get('/api/code', async (req, res) => {

    if (!req.session.email) return res.status(401).send({ message: 'notloggedin' });

    const user = await User.findOne({ email: req.session.email });
    res.send({ code: user.code, codeexp: user.codeexp });
    
});

app.post('/api/resend', async (req, res) => {

    const {email} = req.body;
    
    const newcode = codegen();
    const newcodeexp = new Date(Date.now() + 15 * 60 * 1000);

    await User.findOneAndUpdate(
        { email: email },
        { code: newcode, codeexp: newcodeexp }, 
        { new: true, runValidators: true } 
    );

});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(401).send({message: 'bademail'});
    
    const match = await bcrypt.compare(password, user.passhash);
    if (!match) return res.status(401).send({message: 'badpass'});
    
    if (!user.verified) return res.status(401).send({message: 'unverified'});

    req.session.email = user.email;
    req.session.verified = user.verified;
    res.send({ message: 'goodlogin' });

});

app.post('/create', async (req, res) => { 

    const { email, password } = req.body;
    
    const exists = await User.findOne({ email: email.toLowerCase(), verified: true });
    if(exists) return res.status(400).send({ message: 'existsemail' });

    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const passhash = await bcrypt.hash(password, salt);

    const code = codegen();
    const codeexp = new Date(Date.now() + 15 * 60 * 1000); 

    const newuser = new User({
        email: email.toLowerCase(),
        passhash: passhash,
        code: code,
        codeexp: codeexp,
        verified: false
    });

    req.session.email = newuser.email;
    req.session.verified = newuser.verified;

    await newuser.save();

});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);    
});

function codegen() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}



/*

async function testhash(){

    password = "johnny14";

    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const passhash = await bcrypt.hash(password, salt);

    console.log("password: " + password);
    console.log("passhash: " + passhash);

}

async function testdate(){
    var x = new Date(Date.now() + 15 * 60 * 1000);
}

testdate();


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