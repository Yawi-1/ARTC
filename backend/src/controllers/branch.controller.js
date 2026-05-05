const Branch = require('../models/branch.model'); 
const asyncHandler = require('../utils/asynHandler');
const ApiError = require('../utils/ApiError');

const addBranch = asyncHandler(async (req, res) => {
    const { name, address, contact } = req.body;

    if (!name) {
        throw new ApiError(400, 'Please enter branch name!');
    }
    const existing = await Branch.findOne({ name });
    if (existing) {
        throw new ApiError(400, 'Branch already exists');
    }

    const branch = await Branch.create({ name, address, contact });

    res.status(201).json({
        success: true,
        message: 'New Branch added successfully',
        data: branch
    });
});

const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await Branch.find();

    res.status(200).json({
        success: true,
        message: "Branches fetched successfully",
        data: branches
    });
});

module.exports = { addBranch, getAllBranches };