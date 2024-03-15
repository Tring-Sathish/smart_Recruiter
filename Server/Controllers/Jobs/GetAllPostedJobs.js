const express = require('express');
const Job = require('../../Models/JobModel');
const Orgainization = require('../../Models/Organization_Model');
const app = express();

const GetAllPostedJobs = async (req, res, next) => {

    const fetchAllPostedJobs = await Orgainization.find();
    // const jobs = await Orgainization.findOne({ org_id: id });

    if (fetchAllPostedJobs) {
        return res.status(200).json({ fetchAllPostedJobs })
    }
    else {
        return res.status(400).json({ message: "No job found" })
    }
}

module.exports = GetAllPostedJobs;