const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/schoolDB");
require("./models/main");
require("./models/student");
require("./models/user");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./routes/authApi"));
app.use(require("./routes/studentsApi"));
app.use(require("./routes/classApi"));

app.get("/", async function (req, res) {
    res.send({ root: "Hello this is root directory"});
});




app.listen("3000", function () {
    console.log("listening to port 3000");
});


// initial data addition code (main)-

// let marks1 = new Mark({
//     Physics:55,
//     Chemistry:75
// });

// let marks2 = new Mark({
//     Physics:75,
//     Chemistry:90,
//     Maths:90,
//     PT:55
// });

// let rolls1 = new Roll({
//     Marks:marks1,
//     Student_id:"stu_1"

// });

// let rolls2 = new Roll({
//     Marks:marks2,
//     Student_id:"stu_2"
// });

// let cls = new Class({
//     Year:2020,
//     Class_teacher:"Mr. ABC",
//     Subject_list:["Physics", "Maths", "Chemistry", "PT", "Computer", "English"],
//     Students:{
//         Roll1:rolls1,
//         Roll2:rolls2
//     }
// })



// let data = new Main({
//     Classes:{
//         Class5:cls
//     }
// });

// // data.save();

// console.log(JSON.stringify(data));