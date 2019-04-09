// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path= require('path');

var app = express();
const route = require("./controllers/employeeController");
// connecting the server with the mongodb database using mongoose.connect function
mongoose.connect('mongodb://localhost:27017/employeelist');

// connection messages
mongoose.connection.on('connected', ()=>{
  console.log("CONNECTED TO DATABASE MONGO DB @27017");
})
mongoose.connection.on('error', (err)=>{
  if(err){
    console.log("Connection failed!:(" + "ERROR:-" + err);
   }
})
// port no 
const port = 3000;
// ==adding middlewares==
// adding cors
app.use(cors({ origin: 'http://localhost:4200' }));
// adding body-parser
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

// testing server
app.get('/', (req, res)=>{
  res.send ("footer");
})
// listening to the port
app.listen(port, ()=>{
  console.log("++++Server started at port;- "+ port);
})