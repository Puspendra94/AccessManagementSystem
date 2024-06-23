import { DataSource } from 'typeorm';

import rdbmsConfig from './db.config';
import logger from './logger';

logger.debug(rdbmsConfig);
export const dataSource = new DataSource(rdbmsConfig);