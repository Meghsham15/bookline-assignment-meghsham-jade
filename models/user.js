const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    expiryDate:{
        type:String,
        required:true
    }
});

mongoose.model("User",userSchema);