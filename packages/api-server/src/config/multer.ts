import fs from 'fs';
import path from 'path';
import multer from 'multer';

const PUBLIC_DIRECTORY = './public';
const AVATAR_BUCKET_DIRECTORY = './public/user-avatars';

if (!fs.existsSync(PUBLIC_DIRECTORY)) {
  fs.mkdirSync(PUBLIC_DIRECTORY);
}

if (!fs.existsSync(AVATAR_BUCKET_DIRECTORY)) {
  fs.mkdirSync(AVATAR_BUCKET_DIRECTORY);
}

const storage = multer.diskStorage({
  destination: './public/user-avatars',
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '--' + file.originalname);
  },
});

export const upload = multer({ storage });
