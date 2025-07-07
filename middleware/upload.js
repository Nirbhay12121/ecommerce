const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../uploads');

// Check kar ke folder bana do agar nahi hai
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('✅ uploads folder created automatically.');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
