import { RedisOptions } from 'ioredis';

export class RedisConfig {
  private readonly HOST: string;
  private readonly PORT: string;
  private readonly USERNAME: string | undefined;
  private readonly PASSWORD: string | undefined;
  private readonly DB: string | undefined;

  constructor(prefix: string) {
    this.HOST = process.env[[prefix, 'HOST'].join('_')];
    this.PORT = process.env[[prefix, 'PORT'].join('_')];
    this.USERNAME = process.env[[prefix, 'USERNAME'].join('_')];
    this.PASSWORD = process.env[[prefix, 'PASSWORD'].join('_')];
    this.DB = process.env[[prefix, 'DB'].join('_')];
  }

  public getOptions(): RedisOptions {
    return {
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      db: this.DB ? Number(this.DB) : undefined,
    };
  }
}
