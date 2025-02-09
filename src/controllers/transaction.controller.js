const {status} = require("http-status");

const parseXML = require("../utils/parseXML");
const Report = require("../models/Report");
const catchAsync = require("../utils/catchAsync");

const uploadXML = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  const extractedData = await parseXML(req.file?.path);
  const newReport = await Report.create(extractedData);
  // console.log(status.INTERNAL_SERVER_ERROR);
  
  res.status(status.CREATED).send(newReport);
});

const getReports = catchAsync(async (req, res) => {
  const reports = await Report.find();
  res.status(status.OK).send(reports);
});

module.exports = { uploadXML, getReports };
