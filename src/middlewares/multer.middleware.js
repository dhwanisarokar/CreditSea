const multer = require("multer");
const ApiError = require("../utils/ApiError.js");


// Multer config to store uploaded files in 'uploads/' directory
const upload = multer({
  
  dest: "src/uploads/", // Directory where the files will be temporarily stored
  limits: { fileSize: 1024 * 1024 }, // File size limit of 1 MB
  fileFilter: (req, file, cb) => {
      // Only accept .xml files
      
      if (file.mimetype !== "text/xml") {
        return cb(new ApiError(400, "Only xml files are allowed!"), false);
      }
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
module.exports.upload = upload;
