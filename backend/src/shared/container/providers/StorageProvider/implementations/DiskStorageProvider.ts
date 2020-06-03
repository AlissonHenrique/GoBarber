import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uplodConfig from '@config/upload';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uplodConfig.tmpFolder, file),
      path.resolve(uplodConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uplodConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
