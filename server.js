//Include the necessary extensions

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

//encode url
app.use(bodyparser.urlencoded({extended: true}));

//connecting to mongoDB
mongoose.connect("mongodb+srv://username:password@cluster0.nnapghi.mongodb.net", { useNewUrlParser: true }, { useUnifiedTopology: true });

// Create data Schema
const regSchema = {
    Towed: String,
    licencePlete: String,
    reason: String,
    note: String,
    attachtment: String
}

const Reg = mongoose.model("Details", regSchema);

//To present the html page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/main.html");
})

//Send data to mongoDB
app.post("/", function(req, res) {
    let newReg = new Reg({
        Towed: req.body.towed,
        licencePlete: req.body.licencePlete,
        reason: req.body.reason,
        note: req.body.note,
        attachtment: req.body.attachtment
    });
    newReg.save();
    //Remain on thesame page after submition
    res.redirect("/");
})

// To listen on PORT 3000

app.listen(3000, function() {
    console.log("Listening on 3000");
})
