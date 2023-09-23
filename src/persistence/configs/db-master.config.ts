import 'dotenv/config';

import { DataSourceOptions, LogLevel } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';

import { TypeOrmTypeCastField } from './interfaces';
import { DataSourceName } from '../enums';

export class DBMasterConfig {
  private readonly TYPE: any;
  private readonly HOST: string;
  private readonly PORT: string;
  private readonly USERNAME: string;
  private readonly PASSWORD: string;
  private readonly DATABASE: string;
  private readonly SYNCHRONIZE: string;
  private readonly TIMEZONE: string;
  private readonly LOGGING: string;
  private readonly DROP_SCHEMA: string;

  constructor(prefix: string) {
    this.TYPE = process.env[[prefix, 'TYPE'].join('_')];
    this.HOST = process.env[[prefix, 'HOST'].join('_')];
    this.PORT = process.env[[prefix, 'PORT'].join('_')];
    this.USERNAME = process.env[[prefix, 'USERNAME'].join('_')];
    this.PASSWORD = process.env[[prefix, 'PASSWORD'].join('_')];
    this.DATABASE = process.env[[prefix, 'DATABASE'].join('_')];
    this.SYNCHRONIZE = process.env[[prefix, 'SYNCHRONIZE'].join('_')];
    this.TIMEZONE = process.env[[prefix, 'TIMEZONE'].join('_')];
    this.LOGGING = process.env[[prefix, 'LOGGING'].join('_')];
    this.DROP_SCHEMA = process.env[[prefix, 'DROP_SCHEMA'].join('_')];
  }

  public getOptions(entities: Type<any>[]): TypeOrmModuleOptions | DataSourceOptions {
    return {
      entities,
      name: DataSourceName.MASTER,
      type: this.TYPE,
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      synchronize: this.SYNCHRONIZE === 'true',
      dropSchema: this.DROP_SCHEMA === 'true',
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
