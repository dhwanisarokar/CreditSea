
const ReportDisplay = ({ reports }) => {
  return (
    <div className="mt-6 text-black">
      {reports.map((report, index) => (
        <div key={index} className="border rounded-lg p-4 mb-6 bg-gray-50">
          <h2 className="text-lg font-semibold text-blue-600">
            Report {index + 1}
          </h2>

          {/* Basic Details */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 text-2xl">Basic Details</h3>
            <p>
              <strong>Name:</strong> {report.name}
            </p>
            <p>
              <strong>Mobile:</strong> {report.mobilePhone}
            </p>
            <p>
              <strong>PAN:</strong> {report.PAN}
            </p>
            <p>
              <strong>Credit Score:</strong> {report.creditScore}
            </p>
          </div>

          {/* Report Summary */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 text-2xl">Report Summary</h3>
            <p>
              <strong>Total Accounts:</strong>{" "}
              {report.reportSummary.totalAccounts}
            </p>
            <p>
              <strong>Active Accounts:</strong>{" "}
              {report.reportSummary.activeAccounts}
            </p>
            <p>
              <strong>Closed Accounts:</strong>{" "}
              {report.reportSummary.closedAccounts}
            </p>
            <p>
              <strong>Current Balance:</strong> ₹
              {report.reportSummary.currentBalance}
            </p>
            <p>
              <strong>Secured Amount:</strong> ₹
              {report.reportSummary.securedAmount}
            </p>
            <p>
              <strong>Unsecured Amount:</strong> ₹
              {report.reportSummary.unsecuredAmount}
            </p>
            <p>
              <strong>Last 7 Days Credit Enquiries:</strong>{" "}
              {report.reportSummary.last7DaysEnquiries}
            </p>
          </div>

          {/* Credit Accounts */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 text-2xl">Credit Accounts</h3>
            {report.creditAccounts.map((account, idx) => (
              <div key={idx} className="border p-3 rounded-md bg-white mt-2">
                <p>
                  <strong>Bank:</strong> {account.bank}
                </p>
                <p>
                  <strong>Account No:</strong> {account.accountNumber}
                </p>
                <p>
                  <strong>Credit Limit:</strong> ₹{account.creditLimit}
                </p>
                <p>
                  <strong>Current Balance:</strong> ₹{account.currentBalance}
                </p>
                <p>
                  <strong>Overdue Amount:</strong> ₹{account.overdueAmount}
                </p>
                <p>
                  <strong>Status:</strong> {account.accountStatus}
                </p>
                <p>
                  <strong>Open Date:</strong> {account.openDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportDisplay;
