import 'dotenv/config';

import { DataSourceOptions, LogLevel } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';

import { TypeOrmTypeCastField } from './interfaces';
import { DataSourceName } from './enums';

export class DBSlaveConfig {
  private readonly TYPE: any;
  private readonly HOST: string;
  private readonly PORT: string;
  private readonly USERNAME: string;
  private readonly PASSWORD: string;
  private readonly DATABASE: string;
  private readonly TIMEZONE: string;
  private readonly LOGGING: string;

  constructor(private readonly prefix: string) {
    this.TYPE = process.env[[this.prefix, 'TYPE'].join('_')];
    this.HOST = process.env[[this.prefix, 'HOST'].join('_')];
    this.PORT = process.env[[this.prefix, 'PORT'].join('_')];
    this.USERNAME = process.env[[this.prefix, 'USERNAME'].join('_')];
    this.PASSWORD = process.env[[this.prefix, 'PASSWORD'].join('_')];
    this.DATABASE = process.env[[this.prefix, 'DATABASE'].join('_')];
    this.TIMEZONE = process.env[[this.prefix, 'TIMEZONE'].join('_')];
    this.LOGGING = process.env[[this.prefix, 'LOGGING'].join('_')];
  }

  public getOptions(entities: Type<any>[]): TypeOrmModuleOptions | DataSourceOptions {
    return {
      entities,
      name: DataSourceName.SLAVE,
      type: this.TYPE,
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      logging: ['true', 'false'].includes(this.LOGGING)
        ? this.LOGGING === 'true'
        : (this.LOGGING.split('|') as LogLevel[]),
      autoLoadEntities: true,
      extra: {
        typeCast: (field: TypeOrmTypeCastField, next: () => void) => {
          if (!field.type.includes('LONG')) {
            return next();
          }

          const val = Number(field.string());
          return isNaN(val) ? null : val;
        },
      },
    };
  }
}
