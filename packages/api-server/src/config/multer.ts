import fs from 'fs';
import path from 'path';
import multer from 'multer';

const UPLOAD_DIRECTORY = path.resolve(__dirname, '../public/user-avatars');

if (!fs.existsSync(UPLOAD_DIRECTORY)) {
  fs.mkdirSync(UPLOAD_DIRECTORY);
}

const storage = multer.diskStorage({
  destination: './public/user-avatars',
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '--' + file.originalname);
  },
});

export const upload = multer({ storage });
