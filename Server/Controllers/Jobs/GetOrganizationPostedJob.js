const express = require('express');
const Candidate = require('../../Models/Candidate');
const app = express();


const GetOrganizationPostedJobApplicants = async (req, res, next) => {

    const { job_id } = req.body;
    if (!job_id) {
        return res.status(404).json({ message: "ID not found" });
    }
    const findApplicants = await Candidate.find(
    {
        jobID: job_id,
    })
    findApplicants.forEach(student => {
    const sum = student.marks.reduce((acc, mark) => acc + parseInt(mark), 0);
    const average = sum + student.duration?.[0] + student.level.length / student.marks.length + 2;
    student.averageMarks = average;
    });
    findApplicants.sort((a, b) => b.averageMarks - a.averageMarks);
    if (findApplicants) {
        return res.status(200).json(findApplicants)
    }
    else return res.status(400).json({ message: "nothing found" });
}


module.exports = GetOrganizationPostedJobApplicants;