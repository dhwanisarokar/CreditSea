const fs = require("fs");
const convert = require("xml-js");
const path = require("path");

const ApiError = require("./ApiError.js");
const { status } = require("http-status");

const parseXML = async (filePath) => {
  try {
    const xmlFile = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    console.log(path.join(__dirname, "../../", filePath));
    
    fs.unlinkSync(path.join(__dirname, "../../", filePath)); // Clean up the uploaded file
    const result = convert.xml2json(xmlFile, {
      compact: true,
      space: 4,
    });

    const extractedData = (xmlData) => {
      const profile = xmlData.INProfileResponse || {};
      const header = profile.CreditProfileHeader || {};
      const applicant =
        profile.Current_Application?.Current_Application_Details
          ?.Current_Applicant_Details || {};
      const summary = profile.CAIS_Account?.CAIS_Summary || {};
      const creditAccounts = profile.CAIS_Account?.CAIS_Account_DETAILS || [];
      const score = profile.SCORE?.BureauScore?._text || "N/A";

      return {
        name: `${applicant.First_Name?._text || ""} ${
          applicant.Last_Name?._text || ""
        }`.trim(),
        mobilePhone: applicant.MobilePhoneNumber?._text || "N/A",
        PAN:
          creditAccounts[0]?.CAIS_Holder_Details?.Income_TAX_PAN?._text ||
          "N/A",
        creditScore: parseInt(score),

        reportSummary: {
          totalAccounts: parseInt(
            summary.Credit_Account?.CreditAccountTotal?._text || 0
          ),
          activeAccounts: parseInt(
            summary.Credit_Account?.CreditAccountActive?._text || 0
          ),
          closedAccounts: parseInt(
            summary.Credit_Account?.CreditAccountClosed?._text || 0
          ),
          currentBalance: parseInt(
            summary.Total_Outstanding_Balance?.Outstanding_Balance_All?._text ||
              0
          ),
          securedAmount: parseInt(
            summary.Total_Outstanding_Balance?.Outstanding_Balance_Secured
              ?._text || 0
          ),
          unsecuredAmount: parseInt(
            summary.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured
              ?._text || 0
          ),
          last7DaysEnquiries: parseInt(
            profile.TotalCAPS_Summary?.TotalCAPSLast7Days?._text || 0
          ),
        },

        creditAccounts: creditAccounts.map((account) => ({
          bank: account.Subscriber_Name?._text || "N/A",
          accountNumber: account.Account_Number?._text || "N/A",
          creditLimit: parseInt(account.Credit_Limit_Amount?._text || 0),
          currentBalance: parseInt(account.Current_Balance?._text || 0),
          overdueAmount: parseInt(account.Amount_Past_Due?._text || 0),
          accountStatus: account.Account_Status?._text || "N/A",
          openDate: account.Open_Date?._text || "N/A",
        })),
      };
    };

    return extractedData(JSON.parse(result));
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = parseXML;
