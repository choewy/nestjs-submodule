import { DataSource, DataSourceOptions } from 'typeorm';

import { DBConfig } from '@submodule/persistence';
import { ClickCount, User } from '@submodule/entities';

const main = async () => {
  new DataSource(new DBConfig('DB').getOptions([User, ClickCount]) as DataSourceOptions).initialize();
};

main();
