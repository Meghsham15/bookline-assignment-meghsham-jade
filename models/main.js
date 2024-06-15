const mongoose = require("mongoose");

let marksSchema = new mongoose.Schema({
    Physics:{
        type:Number,
        min:0,
        max:100
    },
    Maths:{
        type:Number,
        min:0,
        max:100
    },
    Chemistry:{
        type:Number,
        min:0,
        max:100
    },
    PT:{
        type:Number,
        min:0,
        max:100
    },
    Computer:{
        type:Number,
        min:0,
        max:100
    },
    English:{
        type:Number,
        min:0,
        max:100
    },
});

mongoose.model("Mark",marksSchema);

const rollSchema = new mongoose.Schema({
    Student_id:{
        type:String,
        required:true
    },
    Marks:marksSchema
});
mongoose.model("Roll",rollSchema);

const classSchema = new mongoose.Schema({
    Year:{
        type:Number,
        required:true
    },
    Class_teacher:{
        type:String,
        required:true
    },
    Subject_list:{
        type:Array,
        required:true
    },
    Students:{
        type:Map,
        of:rollSchema
    }
});
mongoose.model("Class",classSchema);

let mainSchema = new mongoose.Schema({
    Classes:{
        type:Map,
        of:classSchema
    }
});

mongoose.model("Main",mainSchema);


