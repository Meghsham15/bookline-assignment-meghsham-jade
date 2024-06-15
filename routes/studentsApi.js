const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");


// Read data - 
router.get("/student",async function (req, res) {
    let foundStudents = await Student.find({});
    if (!foundStudents) {
        res.status(400).send({ message: "Students not found", response: false });
        return;
    }
    res.send({ route: "this is student route", data:foundStudents, response:true });
});

// Add data 
router.post("/student", async function (req, res) {
    let { studentId, name, dob } = req.body;
    let checkStudent = await Student.findOne({ Student_id: studentId });
    if (checkStudent) {
        res.status(400).send({ message: "Student Id already exists", response: false });
        return;
    }
    let newStudent = new Student({
        Student_id: studentId,
        Name: name,
        DOB: dob
    });
    try {
        await newStudent.save();
        res.status(200).send({
            message: "Student added successfully",
            data: newStudent,
            response: true
        });
    } catch (err) {
        console.log("error saving" + err);
        res.status(500).send({ message: "Server error", error: err, response: false });
    }
});

// Update full student data - 
router.put("/student", async function (req, res) {
    let { newStudentId,oldStudentId, name, dob } = req.body;
    try {
        const updatedArticle = await Student.findOneAndUpdate(
            { Student_id: oldStudentId },
            { Student_id: newStudentId, Name: name, DOB: dob },
            { new: true, overwrite: true } // `new: true` returns the updated document
        );
        if (!updatedArticle) {
            return res.status(404).send({ message: 'Student not found', response: false });
        }
        res.status(200).send({ message: 'Successfully Updated the data put', data: updatedArticle, response: true });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err, response: false });
    }
});

// update partial student data - 
router.patch("/student", async function (req, res) {
    let { studentId, name, dob } = req.body;
    try {
        const updatedArticle = await Student.findOneAndUpdate(
            { Student_id: studentId },
            { $set: { Student_id: studentId, Name: name, DOB: dob } },
            { new: true }  // `new: true` returns the updated document
        );
        if (!updatedArticle) {
            return res.status(404).send({ message: 'Student not found', response: false });
        }
        res.status(200).send({ message: 'Successfully Updated the data patch', data: updatedArticle, response: true });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err, response: false });
    }
});


// delete all the data - 
router.delete("/student/deleteAll",async function(req,res){
    try{
        await Student.deleteMany({});
        res.status(200).send({ message: 'Successfully deleted all the data', response: true });
    }catch(err){
        res.status(500).send({ message: 'Server error', error: err, response: false });
    }
});


// delte specific student data - 
router.delete("/student/deleteOne",async function(req,res){
    let { studentId, name, dob } = req.body;
    let checkStudent = await Student.findOne({ Student_id: studentId });
    if (!checkStudent) {
        res.status(400).send({ message: "Student Id doesnt exists", response: false });
        return;
    };
    try{
        await Student.deleteOne({Student_id:studentId});
        res.status(200).send({ message: 'Successfully deleted the Students data', response: true });
    }catch(err){
        res.status(500).send({ message: 'Server error', error: err, response: false });
    }
})

module.exports = router;