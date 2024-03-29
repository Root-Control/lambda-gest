interface IAppConfig {
  port: number;
  redis: IRedis;
  jwt: IJwtConfig;
  abstract: IAbstractApi;
  rabbit: IRabbit;
}

interface IAbstractApi {
  endpoint: string;
  apiKey: string;
}

interface IJwtConfig {
  privateKey: string;
  publicKey: string;
  ttl: number;
}
interface IRedis {
  port: number;
  host: string;
}

interface IRabbit {
  port: number;
  host: string;
}

export { IAppConfig, IRedis, IJwtConfig, IAbstractApi, IRabbit };
