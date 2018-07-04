import * as path from 'path';
import { juggler } from '@loopback/repository';

const dsConfigPath = path.resolve(
  __dirname,
  // 3 ".."'s because src files will be copied inside an extra dist directory
  '../../../config/datasources.json',
);

const config = require(dsConfigPath);

export const db = new juggler.DataSource(config);
