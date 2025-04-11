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
    if(req.session.loggedin) return res.redirect('/main');
    res.sendFile(path.join(__dirname,'public','login.html'));
});

app.get('/create', (req,res) => {
    if(req.session.loggedin) return res.redirect('/main');
    res.sendFile(path.join(__dirname,'public','create.html'));
});

app.get('/forgot', (req,res) => {
    res.sendFile(path.join(__dirname,'public','forgot.html'));
});

app.get('/verify', (req,res) => {

    if(req.session.loggedin) return res.redirect('/main');
    if(!req.session.email) return res.redirect('/login');
    if(req.session.verified) return res.redirect('/main');
    
    res.sendFile(path.join(__dirname,'public','verify.html'));

});

app.get('/reset', (req,res) => {
    if(loggedin) return res.redirect('/main');
    if(!req.session.email || !req.session.resetallowed) return res.redirect('/login');

    res.sendFile(path.join(__dirname,'public','reset.html'));
});

app.get('/main', (req,res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'public','main.html'));
});

app.get('/settings', (req,res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'public','settings.html'));
});

app.get('/delete', (req,res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'public','delete.html'));
});

app.get('/change', (req,res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'public','change.html'));
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(401).send({message: 'bademail'});
    
    const match = await bcrypt.compare(password, user.passhash);
    if (!match) return res.status(401).send({message: 'badpassw'});

    req.session.email = user.email;
    req.session.verified = user.verified;
    
    if (!user.verified) return res.status(401).send({message: 'unverified'});

    req.session.loggedin = true;
    
    res.send({ message: 'goodlogin' });

});

app.post('/create', async (req, res) => { 

    const { email, password } = req.body;
    
    var exists = await User.findOne({ email: email.toLowerCase(), verified: true });

    if(req.session.email) req.session.email = null;
    if(req.session.verified) req.session.verified = null;

    exists = await User.findOne({ email: email.toLowerCase(), verified: false });

    if(exists){
        await User.findOneAndDelete({ email: email.toLowerCase(), verified: false });
        req.session.email = null;
        req.session.verified = null;
    }

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
    
    res.send({ message: 'goodcreate' });
    //send email with code
    //sendmail(email, code);

});

app.post('/forgot', async (req, res) => {  
    
    const { email } = req.body;
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if(!user) return res.status(401).send({ message: 'bademail' });

    if(!user.verified){
        req.session.email = user.email;
        req.session.verified = user.verified;
        return res.status(401).send({ message: 'unverified' });
    }

    if(req.session.email) req.session.email = null;
    if(req.session.verified) req.session.verified = null;

    const newcode = codegen();
    const newcodeexp = new Date(Date.now() + 15 * 60 * 1000);
    await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { code: newcode, codeexp: newcodeexp }, 
        { new: true, runValidators: true } 
    );

    //send email with code
    //sendmail(email, newcode);

    res.send({ message: 'goodforgot' });
}
);

app.get('/api/session', (req, res) => {
    res.json({
        email: req.session.email || null,
        verified: req.session.verified || null
    });
});

app.post('/api/resend', async (req, res) => {
    
    const { email, forgot } = req.body;

    if (!forgot){
        if (!req.session.email) return res.status(401).send({ message: 'noemail' });
        if (req.session.verified) return res.status(401).send({ message: 'yesverified' });
    }
    
    const newcode = codegen();
    const newcodeexp = new Date(Date.now() + 15 * 60 * 1000);

    await User.findOneAndUpdate(
        { email: email },
        { code: newcode, codeexp: newcodeexp }, 
        { new: true, runValidators: true } 
    );

    //send email with code
    //sendmail(email, newcode);

});

app.post('/api/verify', async (req, res) => {   

    const { email, attempt, forgot } = req.body;

    if (!forgot){
        if (!req.session.email) return res.status(401).send({ message: 'notloggedin' });
        if (req.session.verified) return res.status(401).send({ message: 'alreadyverified' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const c = user.code;
    const exp = user.codeexp;

    if(c !== attempt) return res.status(401).send({ message: 'badcode' });
    if(new Date(exp).getTime() < Date.now()) return res.status(401).send({ message: 'expired' });

    await User.findOneAndUpdate(
        { email: email },
        { verified: true }, 
        { new: true, runValidators: true } 
    );

    req.session.verified = true;
    req.session.email = email;

    if (!forgot) req.session.loggedin = true;
    else req.session.resetallowed = true;

    res.send({ message: 'goodverify' });

});

app.post('/api/signout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error signing out');
        }
    });
    return res.send({ message: 'signedout' });
});

app.post('/api/delete', async (req, res) => {

    const { password } = req.body;

    if (!req.session.email) return res.status(401).send({ message: 'noemail' });
    
    const user = await User.findOne({ email: req.session.email });

    const match = await bcrypt.compare(password, user.passhash);
    if (!match) return res.status(401).send({ message: 'badpassw' });

    await User.findOneAndDelete({ email: req.session.email });
    
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error signing out');
        }
    });

    res.send({ message: 'gooddelete' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);    
});

function codegen() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}