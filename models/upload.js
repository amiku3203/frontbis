const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('photo');

const upload1 = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('logo');



const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB per file
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('photos', 10); // Allow up to 10 files at a time

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = { upload, uploadMultiple,upload1 };
