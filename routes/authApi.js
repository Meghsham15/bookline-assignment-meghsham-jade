const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
require('dotenv').config();
const saltRounds = process.env.SALT;

router.get("/Auth", function (req, res) {
    res.send({ trail: "This is Auth route" });
});

router.post("/Auth/register", async function (req, res) {
    let { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).send({ error: "UserId and password are required", response: false });
    }

    let checkId = await User.findOne({ userId: userId });
    if (checkId) {
        return res.status(400).send({ message: "UserId already exists", response: false });
    }


    let expiryDate = getDate30DaysLater().toLocaleDateString();

    bcrypt.hash(password, Number(saltRounds), async function (err, hash) {
        if (err) {
            console.log("error hashing");
            res.status(500).send({ message: "server error", error: err, response: false });
            return;
        };

        let newUser = new User({
            userId,
            password: hash,
            expiryDate: expiryDate
        });

        try {

            await newUser.save();
            console.log("New user registered:", newUser);

            // Send success response
            res.status(200).send({
                message: "User registered successfully",
                data: {userId,expiryDate},
                response: true
            });

        } catch (err) {
            console.error("Error during registration:", err);
            res.status(500).send({ message: "Server error", error: err, response: false });
        }
    });

});


router.post("/Auth/login", async function (req, res) {
    let { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).send({ error: "UserId and password are required", response: false });
    }

    let foundUser = await User.findOne({ userId: userId });
    if (!foundUser) {
        return res.status(404).send({ message: "User Id not found", response: false });
    }

    bcrypt.compare(password, foundUser.password, function (err, result) {
        if (err) {
            return res.status(401).send({ message: "Invalid password", response: false });
        }
        res.status(200).send({
            message: "User logged in successfully",
            data: { userId: foundUser.userId, expiryDate: foundUser.expiryDate },
            response: true
        });

    })
})



function getDate30DaysLater() {
    let currentDate = new Date();
    let futureDate = new Date(currentDate); // Copy current date

    futureDate.setDate(currentDate.getDate() + 30); // Add 30 days

    return futureDate;
}

module.exports = router;