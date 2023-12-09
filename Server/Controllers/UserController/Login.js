const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../Models/User_Model.js");
const dotenv = require('dotenv');

dotenv.config(); 
const secret = process.env.KEY;

const login = async (req, res, next) => {
    console.log("????????????",secret)
    const { email, password } = req.body;
    console.log(14,email, password)
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {


        const findUser = await userModel.findOne({ email: email });
        console.log(22,findUser)
        if (!findUser) {
            return res.status(404).json({
                error: "No such user found",
            });
        }

        // **************************************
        // -> INITIAL LOGIC || JUST BLAZING-UP
        // **************************************
        // const checkStatus = await userModel.findOne({ isVerified: false });
        // if (checkStatus) {
        //     console.log(checkStatus);
        //     return res.status(403).json({
        //         error: "Email isn't verified, kindly first verify your email address",
        //     });
        // }

        const checkStatus = findUser.isVerified;
        if (checkStatus == false) {
            return res.status(403).json({
                error: "Email isn't verified, kindly first verify your email address",
            });
        }



        // Compare the passwords
        const unhashed = await bcrypt.compare(password, findUser.password);
        console.log(51,unhashed)
        if (!unhashed) {
            return res.status(401).json({
                error: "Incorrect password",
            });
        }
        //putting user id in pyaload so find user uniquely
        const payload = {
            id: findUser._id,
            user: findUser.f_name
        };
        console.log(61,payload,findUser)
        const token = jwt.sign(payload, process.env.KEY, { expiresIn: "96h" });
        console.log(63,token)
        return res.status(200).json({
            message: "Login successful",
            token: token,
        });
    }

    catch (e) {
        res.send("Something un-expected happend! " + e)
    }
};
module.exports = login;
