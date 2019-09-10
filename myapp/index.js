const express = require("express");
const bodyParser = require("body-parser");
// express config
const app = express();
app.use(express.static("public"));
app.set("view engine");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var cors=require("cors");
app.use(cors())

// app.get('/', function (req, res) {
//     res.send('hello akshay')
// })

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'stock';

// Create a new MongoClient
const client = new MongoClient(url);

let db;

// Use connect method to connect to the Server
client.connect(function(err) {
  db = client.db(dbName);
  console.log("RUNNING")
});

app.get("/stock", function (req, res) {
    // res.json({ "users": users }) 
    db.collection("users").find({}).toArray(function(err,response){
        console.log(response)
        res.json({"users":response})
    })
});

app.get("/stock/show/:id", function (req, res) {
    var userId = req.params["id"];
    var ObjectId = require('mongodb').ObjectId;
    var new_id= new ObjectId(userId);
    db.collection('users').find({"_id":new_id}).toArray(function(err, response){
      res.json({'user':response})
    })
});

app.post("/stock/create", function (req, res) {
    db.collection("users").insertOne({"product_name":req.body.product_name,"product_id":req.body.product_id,"product_quantity":req.body.product_quantity,"brand":req.body.brand},function(err, response){
        console.log(response)
    })
});


app.post("/stock/:id",function(req, res){
    const userId =req.params["id"]
    let ObjectId = require("mongodb").ObjectId
    let id = new ObjectId(userId)
    db.collection("users").updateOne({"_id":id},{$set:{"product_name":req.body.product_name,"product_id":req.body.product_id,"product_quantity":req.body.product_quantity,"brand":req.body.brand}}),(function(err,response){
        res.json({"users":response})
    })
})


app.listen(3007)
console.log("Running Server")