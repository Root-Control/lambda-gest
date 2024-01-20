import { getString } from '../@common/utilities/utils';
import { IAppConfig } from './configuration.interface';

export default (): IAppConfig => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  redis: {
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  },
  abstract: {
    endpoint: getString(process.env.ABSTRACT_API || ''),
    apiKey: getString(process.env.ABSTRACT_TOKEN || ''),
  },
  jwt: {
    privateKey: getString(process.env.JWT_PRIVATE_KEY || ''),
    publicKey: getString(process.env.JWT_PUBLIC_KEY || ''),
    ttl: 5000,
  },
});
