import { DataSource, DataSourceOptions } from 'typeorm';

import { DBConfig } from '@submodule/persistence';
import { User, Click } from '@submodule/entities';

const main = async () => {
  new DataSource(new DBConfig('DB').getOptions([User, Click]) as DataSourceOptions).initialize();
};

main();
