const Transaction = require('../models/transactions.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asynHandler')

const addTransaction = asyncHandler(async (req, res) => {
    const { branch } = req.user
    const { type, amount, category, remarks } = req.body;
    if (!type || !amount || !category) {
        throw new ApiError('All fields are required', 400)
    }

    const transaction = new Transaction({ branch, type, amount, category, remarks })
    await transaction.save()

    res.json({ message: 'New transaction added', data: { id: transaction._id, branch, type, amount, category, remarks } })
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

    // 🔐 Role-based filtering
    let filter = {};

    if (req.user.role === 'admin') {
        if (branch) filter.branch = branch; 
    } else {
        filter.branch = req.user.branch; // normal user restricted
    }

    // Optional filters
    if (type) filter.type = type;
    if (category) filter.category = category;

    // 📊 Fetch paginated data
    const transactions = await Transaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    // 📈 Total count
    const totalCount = await Transaction.countDocuments(filter);

    // 💰 Total amount (aggregation)
    const totalAmountResult = await Transaction.aggregate([
        { $match: filter },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);

    const totalAmount = totalAmountResult[0]?.total || 0;

    res.json({
        success: true,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        totalAmount,
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

module.exports = {addTransaction,updateTransaction,getTransactions,deleteTransaction}