import { DataSource, DataSourceOptions } from 'typeorm';

import { DBConfig } from '@submodule/persistence';
import { User } from '@submodule/entities';

const main = async () => {
  new DataSource(new DBConfig('DB').getOptions([User]) as DataSourceOptions).initialize();
};

main();
