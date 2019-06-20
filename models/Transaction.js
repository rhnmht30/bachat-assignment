const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["credit", "debit"], required: true },
  created_at: { type: Date, default: Date.now },
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bank: { type: String }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
