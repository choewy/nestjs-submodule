import { DataSource, DataSourceOptions } from 'typeorm';

import { DBMasterConfig } from '@submodule/persistence/configs';
import { User, Click } from '@submodule/entities';

const main = async () => {
  new DataSource(new DBMasterConfig('DB_MASTER').getOptions([User, Click]) as DataSourceOptions).initialize();
};

main();
