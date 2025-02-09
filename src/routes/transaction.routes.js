const express = require("express");

const {
  getReports,
  uploadXML,
} = require("../controllers/transaction.controller");
const { upload } = require("../middlewares/multer.middleware");

const router = express.Router();

// console.log("hello");
router.post("/file/upload", upload.single("file"), uploadXML);
router.get("/reports", getReports);

module.exports = router;
