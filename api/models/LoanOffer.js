const mongoose = require("mongoose");

const loanOfferSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  lender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LoanOffer = mongoose.model("LoanOffer", loanOfferSchema);

module.exports = LoanOffer;
