import { ListenOptions } from 'net';

export class ServerConfig {
  private readonly HOST: string;
  private readonly PORT: string;

  constructor(prefiX: string) {
    this.HOST = process.env[[prefiX, 'HOST'].join('_')];
    this.PORT = process.env[[prefiX, 'PORT'].join('_')];
  }

  public getOptions(): ListenOptions {
    return {
      host: this.HOST,
      port: Number(this.PORT),
    };
  }
}
