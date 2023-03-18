const express = require("express");
const router = express.Router();

const { compareLoans } = require("../../services/loanComparisonService");
const auth = require("../../middleware/auth");
const loanController = require("../../controllers/loanController");

router.post("/compare", auth, (req, res) => {
  const loanOffers = req.body;

  const sortedLoanOffers = compareLoans(loanOffers);

  res.status(200).json({ sortedLoanOffers });
});
// only users with a valid JWT token can save loan offers. The route accepts interest rate, fees, and lender in the request body and saves the loan offer to the database.
router.post("/save", auth, loanController.saveLoanOffer);

// This route is protected by the auth middleware, so only users with a valid JWT token can fetch their loan offers. The route retrieves the loan offers for the currently authenticated user from the database.
router.get("/offers", auth, loanController.getLoanOffers);
router.get("/offers/:id", auth, loanController.getLoanOfferById);

// only users with a valid JWT token can delete a loan offer. The route deletes the loan offer by ID for the currently authenticated user from the database.
router.delete("/offers/:id", auth, loanController.deleteLoanOfferById);

module.exports = router;
