// This service function accepts an array of loan offers, each containing an interest rate and fees, and returns the loan offers sorted by their effective rate (interest rate + fees).

const compareLoans = (loanOffers) => {
  if (!loanOffers || loanOffers.length === 0) {
    return [];
  }

  loanOffers.sort((a, b) => {
    const aEffectiveRate = a.interestRate + a.fees;
    const bEffectiveRate = b.interestRate + b.fees;

    return aEffectiveRate - bEffectiveRate;
  });

  return loanOffers;
};

module.exports = {
  compareLoans,
};
