const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    Student_id:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    }
});

mongoose.model("Student",studentSchema);