const Transaction = require('../models/transactions.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asynHandler')
const mongoose = require('mongoose');

const addTransaction = asyncHandler(async (req, res) => {
    let branch;
    if (req.user.role === "Admin") {
        branch = req.body.branch || req.user.branch;
    } else {
        branch = req.user.branch;
    }
    const { type, amount, category, remarks, date } = req.body;
    if (!type || !amount || !category) {
        throw new ApiError('All fields are required', 400)
    }

    const transaction = new Transaction({ branch, type, amount, category, remarks, date })
    await transaction.save()
    await transaction.populate('branch', 'name');

    res.json({ message: 'New transaction added', data: transaction })
})

const updateTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, amount, category, remarks } = req.body;

    if (!id) {
        throw new ApiError('Transaction id not found.', 404);
    }

    const transaction = await Transaction.findOneAndUpdate(
        { _id: id, branch: req.user.branch },
        { type, amount, category, remarks },
        { new: true, runValidators: true }
    );

    if (!transaction) {
        throw new ApiError('Transaction not found or unauthorized.', 404);
    }

    res.json({
        message: 'Transaction updated',
        data: transaction
    });
});
const getTransactions = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, branch, type, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;


    let filter = {};

    if (req.user.role === 'Admin') {
        if (branch) {
            filter.branch = new mongoose.Types.ObjectId(branch);
        }
    } else {
        filter.branch = new mongoose.Types.ObjectId(req.user.branch);
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter).populate('branch', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    // 📈 Total count
    const totalCount = await Transaction.countDocuments(filter);

    // 💰 Income & Expense totals
    const totals = await Transaction.aggregate([
        { $match: filter },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach((item) => {
        if (item._id === "income") totalIncome = item.total;
        if (item._id === "expense") totalExpense = item.total;
    });

    res.json({
        success: true,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        totalIncome,
        totalExpense,
        data: transactions
    });
});
const deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError('Transaction id is required', 400);
    }

    let transaction;

    // ✅ If admin → delete anything
    if (req.user.role === 'admin') {
        transaction = await Transaction.findByIdAndDelete(id);
    }
    // ✅ Normal user → restricted delete
    else {
        transaction = await Transaction.findOneAndDelete({
            _id: id,
            branch: req.user.branch
        });
    }

    if (!transaction) {
        throw new ApiError('Transaction not found or unauthorized', 404);
    }

    res.json({
        success: true,
        message: 'Transaction deleted successfully'
    });
});

module.exports = { addTransaction, updateTransaction, getTransactions, deleteTransaction }