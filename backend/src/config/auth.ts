import 'dotenv/config';

interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.APP_SECRETE,
    expiresIn: '1d',
  },
} as IAuthConfig;
