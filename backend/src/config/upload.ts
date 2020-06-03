import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      });
    },
  }),
};
