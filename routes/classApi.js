const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Class = mongoose.model("Class");
const Main = mongoose.model("Main");

router.get("/class", async function (req, res) {
    let data = await Main.find({});
    res.send({ router: "this is class data rooute", data, response: true });
})

router.post("/class", async function (req, res) {
    let { className, data } = req.body;
    data = JSON.parse(data);
    let checkClass = await findClassById(className);
    if (checkClass.response) {
        res.status(400).send({ message: "Class Id already exists", response: false });
        return;
    };

    try {
        const newClass = {
            Year: data.Year,
            Class_teacher: data.Class_teacher,
            Subject_list: data.Subject_list,
            Students: new Map(Object.entries(data.Students))
        };

        // Find the main document (you can customize the search criteria)
        let mainDoc = await Main.findOne();

        if (!mainDoc) {
            mainDoc = new Main({ Classes: new Map() });
        }

        mainDoc.Classes.set(className, newClass);

        // Save the document
        await mainDoc.save();

        res.status(200).send({message:'Class added successfully',response:true});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Internal Server Error',error,response:false});
    }

    // res.status(200).send({
    //     message: "Class added successfully",
    //     response: true
    // });

});

router.post("/class/result",async function(req,res){
    try {
        const { className, subject } = req.body;

        // Find the class document
        const mainDoc = await Main.findOne({ [`Classes.${className}`]: { $exists: true } });

        if (!mainDoc) {
            return res.status(404).send('Class not found');
        }

        const classData = mainDoc.Classes.get(className);

        const results = [];

        classData.Students.forEach((student, roll) => {
            if (student.Marks[subject] !== undefined) {
                results.push({
                    Roll: roll,
                    Student_id: student.Student_id,
                    Marks: student.Marks[subject]
                });
            }
        });

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

async function findClassById(classId) {
    try {
        const result = await Main.findOne({ [`Classes.${classId}`]: { $exists: true } });
        // console.log("Class found:", result.Classes.get(classId));
        return { data: result.Classes.get(classId), response: true };
    } catch (err) {
        // console.error("Error finding class:", err);
        return { err, response: false };
    }
}



module.exports = router;







