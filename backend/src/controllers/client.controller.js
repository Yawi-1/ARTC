const Client = require('../models/clients.model')
const asyncHandler = require('../utils/asynHandler')
const ApiError = require('../utils/ApiError');

const addClient = asyncHandler(async (req, res) => {
    const { name, address, contact, email, branch } = req.body;


    if (!name || !email || !branch) {
        throw new ApiError('Client name and email is required');
    }
    try {
        let client = await Client.create({
            name,
            address,
            contact,
            email,
            branch
        })
        client = await client.populate("branch", "name");

        res.status(201).json({
            success: true,
            data: client
        });

    } catch (error) {
        throw error;
    }
});

const getClients = asyncHandler(async (req, res) => {
    let { limit = 10, page = 1, branch, name } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    const skip = (page - 1) * limit;

    let filter = {};
    if (branch) filter.branch = branch
    if (name) filter.name = name

    const clients = await Client.find(filter).populate('branch','name')
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

    const total = await Client.countDocuments(filter);

    res.status(200).json({
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        total,
        data: clients
    });
});

const updateClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, address, contact, email, branch } = req.body;

    const client = await Client.findById(id);

    if (!client) {
        throw new ApiError('Client not found');
    }

    // ✅ Restrict non-admin users
    if (req.user.role !== 'Admin' && client.branch.toString() !== req.user.branch.toString()) {
        throw new ApiError('Not authorized to update this client');
    }

    // ✅ Admin can change branch
    if (req.user.role === 'Admin' && branch) {
        client.branch = branch;
    }

    // ✅ Update fields
    if (name) client.name = name;
    if (address) client.address = address;
    if (contact) client.contact = contact;
    if (email) client.email = email;

    await client.save();

    res.status(200).json({
        success: true,
        data: client
    });
});
const deleteClient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
        throw new ApiError('Client not found');
    }

    // ✅ Restrict non-admin users
    if (req.user.role !== 'Admin' && client.branch.toString() !== req.user.branch.toString()) {
        throw new ApiError('Not authorized to delete this client');
    }

    await client.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Client deleted successfully'
    });
});

module.exports = { addClient, deleteClient, getClients, updateClient }