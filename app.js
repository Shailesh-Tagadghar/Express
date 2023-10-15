const { log } = require("console")
const express = require("express")
const app = express()
var cors = require('cors');
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const conn_str="mongodb+srv://admin:admin@cluster0.se5bb8j.mongodb.net/student?retryWrites=true&w=majority"

mongoose.connect(conn_str, { useNewUrlParser: true , useUnifiedTopology: true})
	.then( () => console.log("Connected successfully...") )
	.catch( (err) => console.log(err) );

//structure
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const student = new mongoose.model("students", userSchema);
app.get("/students", async (req, res) => {
	let data = await student.find();
	res.send(data);})

app.delete("/students", async (req, res) => {
    let result = await student.deleteOne({_id:req.query.id});
    res.send(result);
})

app.use(express.json())
app.post("/students", async (req, res)=>{
    console.log(req.body);

    let obj = new student(req.body)
    var result=obj.save()
    // var tempstd = {name:"laxmi", age:20, city:"navi mumbai"}
    // let obj =new student(tempstd)
    // var result=obj.save();

    // res.send("record inserted successfully.....")
    res.send({"result":"record inserted successfully....."});
})

app.put("/students", async (req, res)=>{
  
    // var result= await student.updateOne({name: "neha"},{$set:{city:"dehli"}})
    // var result = await student.updateOne({ _id: "65227c5060687051fff8efb8"},{$set : {city:"turbhe"}})
    var result = await student.updateOne({ _id: req.body.id},{$set : req.body})
    console.log(req.body);

    res.send({"result":"record updated successfull"})
})

app.get("/students/:id", async (req,res)=>{

    console.log(req.params);

    let data = await student.findOne({_id: req.params.id})
    res.send(data)


})





app.get("/",(req,res)=>{
    res.send("Hello from express ")
})

app.listen(8989,()=>{
    console.log("listening to 8989");
})
