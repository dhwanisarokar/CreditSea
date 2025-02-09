const mongoose = require("mongoose");

const creditAccountSchema = new mongoose.Schema({
  bank: String,
  accountNumber: String,
  creditLimit: Number,
  currentBalance: Number,
  overdueAmount: Number,
  accountStatus: String,
  openDate: String,
});

const reportSchema = new mongoose.Schema(
  {
    name: String,
    mobilePhone: String,
    PAN: String,
    creditScore: Number,

    reportSummary: {
      totalAccounts: Number,
      activeAccounts: Number,
      closedAccounts: Number,
      currentBalance: Number,
      securedAmount: Number,
      unsecuredAmount: Number,
      last7DaysEnquiries: Number,
    },

    creditAccounts: [creditAccountSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
