const express = require ('express');
const bp = require('body-parser');
const path = require('path');
const mysql = require ('mysql2');

//Initiate Express
const app = express();
//Initiate body parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const db = require('./config/db.js');


//Test db connection
db.authenticate()
.then(()=> console.log('Database connected successfully...'))
.catch(err => console.log(`Error :+ ${err}`))

//Set Routes
const payee = require('./routes/apis/payee');
const payments = require('./routes/apis/payments');
const records = require('./routes/apis/records');
const agents = require('./routes/apis/agents');
const location = require('./routes/apis/location');
const user = require('./routes/apis/user');
const auth = require('./routes/apis/auth');


//API Endpoints for each Route
app.use('/api/payee', payee);
app.use('/api/payments', payments);
//app.use('/api/history', records);
//app.use('/api/agent', agents);
//app.use('api/location', location);
app.use('/api/user', user);
app.use('/api/auth', auth);


//Serve static assets when in production
if(process.env.NODE.ENV === 'production'){
    app.use(express.static("build"));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8000;


app.listen (PORT, ()=> {
    console.log('Server running on port 8000')
});