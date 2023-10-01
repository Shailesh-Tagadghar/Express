const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connect_str = "mongodb+srv://useradmin:useradmin@cluster0.xqesyis.mongodb.net/College?retryWrites=true&w=majority"


mongoose.connect(connect_str, { useNewUrlParser: true , useUnifiedTopology: true})
	.then( () => console.log("Connected successfully...") )
	.catch( (err) => console.log(err) );

const userSchema = new mongoose.Schema({
        name: String,
        age: Number,
        city: String
    });
    
const students = new mongoose.model("students", userSchema);

app.get("/students", async(req,res) => {
    let data = await students.find()
    res.send(data)
})

app.get("/", (req,res) => {
    res.send("<h1>Hello Node App</h1>");
})

app.listen(8989, () => {
    console.log(`Server is running on 8989 port`);
})