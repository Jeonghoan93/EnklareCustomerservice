const LoanOffer = require("../models/LoanOffer");

const saveLoanOffer = async (req, res, next) => {
  try {
    const { interestRate, fees, lender } = req.body;

    const loanOffer = new LoanOffer({
      user: req.user._id,
      interestRate,
      fees,
      lender,
    });

    await loanOffer.save();

    res.status(201).json({ message: "Loan offer saved", loanOffer });
  } catch (error) {
    next(error);
  }
};

// users can retrieve their loan offers with pagination by providing page and limit query parameters. If not provided, the default values are page 1 and limit 10.
const getLoanOffers = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const loanOffers = await LoanOffer.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await LoanOffer.countDocuments({ user: userId });

    res.status(200).json({ loanOffers, totalCount });
  } catch (error) {
    next(error);
  }
};

const getLoanOfferById = async (req, res, next) => {
  try {
    const loanOfferId = req.params.id;
    const userId = req.user._id;

    const loanOffer = await LoanOffer.findOne({
      _id: loanOfferId,
      user: userId,
    });

    if (!loanOffer) {
      return res.status(404).json({ message: "Loan offer not found" });
    }

    res.status(200).json({ loanOffer });
  } catch (error) {
    next(error);
  }
};

const deleteLoanOfferById = async (req, res, next) => {
  try {
    const loanOfferId = req.params.id;
    const userId = req.user._id;

    const loanOffer = await LoanOffer.findOneAndDelete({
      _id: loanOfferId,
      user: userId,
    });

    if (!loanOffer) {
      return res.status(404).json({ message: "Loan offer not found" });
    }

    res.status(200).json({ message: "Loan offer deleted", loanOffer });
  } catch (error) {
    next(error);
  }
};

const updateLoanOfferById = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
  ...module.exports,
  saveLoanOffer,
  getLoanOffers,
  getLoanOfferById,
  deleteLoanOfferById,
};
