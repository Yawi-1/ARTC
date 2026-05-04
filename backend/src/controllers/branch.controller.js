const Branch = require('../controllers/branch.controller');
const asyncHandler = require('../utils/asynHandler');
const asynHandler = require('../utils/asynHandler')

const addBranch = asynHandler(async (req, res) => {
    const { name, address, contact } = req.body;
    if (!name) {
        throw new ApiError('Please enter branch name !')
    }
    const branch = await Branch.Create({ name, address, contact })
    res.status(201).json({ success: true, message: 'New Branch added successfully', data: branch })
})

const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await Branch.find({})
    res.status(200).json({ success: true, message: "Branches fetched successfully", data: branches })
})

module.exports = { addBranch, getAllBranches }