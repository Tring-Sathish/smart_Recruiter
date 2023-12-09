const OrganizationModal = require("../../Models/Organization_Model");

const GetEmployee = async (req, res) => {

    const organization_id = req.body.organization_id

    const organizaion = await OrganizationModal.findById(organization_id);
    if (organizaion) {
        const { team_members} = organizaion;
        return res.status(200).json(team_members)
    }
    else {
        res.status(404).json({ message: "No organization found , enter valid organization" });
    }
}

module.exports = GetEmployee;