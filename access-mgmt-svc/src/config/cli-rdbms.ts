import { DataSource } from 'typeorm';

import rdbmsConfig from './db.config';

console.log(rdbmsConfig);
export const dataSource = new DataSource(rdbmsConfig);