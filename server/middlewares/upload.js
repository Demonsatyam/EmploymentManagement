const multer = require('multer');
const path = require('path');

// Define storage strategy for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save the file with its original name
    }
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
    console.log('File MIME type:', file.mimetype); // Log the MIME type of the file

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    } else {
        // Return error message if file is not an image file like jpg or png file with status code 400
        cb(new Error('Only JPG and PNG files are allowed'), false);
    }
};

// Multer upload function
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Max file size is 5MB
});

module.exports = upload; // Ensure you're exporting the `upload` function
