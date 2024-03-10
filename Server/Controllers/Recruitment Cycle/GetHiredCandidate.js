const express = require("express");
const Candidate = require("../../Models/Candidate");
const Job = require("../../Models/JobModel");
const app = express();

const GetHiredCandidate = async (req, res, next) => {
    const { id } = req.body;

    try {
        const getUser = await Candidate.find(
            {
                jobID: id,
                recruitmentCycle: 'Hired'
            }
        );
        const job = await Job.findOne(
            {
                _id: id
            }
        );
        if (getUser && job) {
            return res.status(200).json({ job: job, getUser: getUser });
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something unexpected happend" });
    }
};

module.exports = GetHiredCandidate;
