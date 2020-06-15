import { container } from 'tsyringe';
import IStorageProvider from './models/IStorageProvider';
import UploadConfig from '@config/upload';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProviders';
const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[UploadConfig.driver],
);
