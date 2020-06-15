import { container } from 'tsyringe';
import IMailProvider from './models/IMailProvider';
import EtherelMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

import mailConfig from '@config/mail';

const provider = {
  ethereal: container.resolve(EtherelMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  provider[mailConfig.driver],
);
