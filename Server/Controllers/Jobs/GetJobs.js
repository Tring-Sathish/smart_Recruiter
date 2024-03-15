const express = require("express");
const Job = require("../../Models/JobModel");
const OrganizationModal = require("../../Models/Organization_Model");
const app = express();


const GetJob = async (req, res, next) => {

    const { id } = req.body;
    if (!id) {
        return res.status(440).json({ message: "on id found" });
    }
    const jobs = await Job.find({ org_id: id });
    const org = await OrganizationModal.findOne({ _id: id });
    if (jobs) {
        return res.status(200).json({ jobs, org })
    }
    else {
        return res.status(400).json({ message: 'an error has been occured' })
    }

}

module.exports = GetJob;