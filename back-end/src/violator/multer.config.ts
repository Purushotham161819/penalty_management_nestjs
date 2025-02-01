import { diskStorage } from 'multer'; // Helps define where to store the files
import { extname } from 'path'; // Helps extract the file's extension

// Configuration object for handling file uploads
export const multerConfig = {
  storage: diskStorage({
    // Rule 1: Decide where to store the files
    destination: './uploads', // Store all files in the "uploads" folder
    filename: (req, file, callback) => {
      // Rule 2: Give the file a proper label (unique filename)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Add a timestamp and random number
      const ext = extname(file.originalname); // Get the file extension (e.g., .xlsx or .csv)
      const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`; // Format: fileFieldName-timestamp-random.extension
      callback(null, fileName); // Save the file with this name
    },
  }),
  // Rule 3: Reject unwanted files
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx|csv)$/)) {
      // Allow only .xlsx and .csv files
      return callback(
        new Error('Only .xlsx or .csv files are allowed!'),
        false,
      );
    }
    callback(null, true); // Accept the file
  },
};
