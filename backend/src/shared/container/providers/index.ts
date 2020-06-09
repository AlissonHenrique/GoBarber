import  IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'/
import MailProvider from './MailProvider/models/IMailProvider'
import {container} from 'tsyringe'
import IMailProvider from './MailProvider/models/IMailProvider'

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

