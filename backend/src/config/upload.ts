import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';
import 'dotenv/config';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
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
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-ali',
    },
  },
} as IUploadConfig;
