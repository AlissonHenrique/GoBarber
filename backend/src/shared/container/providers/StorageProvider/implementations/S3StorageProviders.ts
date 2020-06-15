import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uplodConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import mine from 'mime';

export default class S3StorageProviders implements IStorageProvider {
  private client: S3;
  contructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uplodConfig.tmpFolder, file);

    const ContentType = mine.getType(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uplodConfig.config.aws.bucket || 'sddf',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uplodConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
