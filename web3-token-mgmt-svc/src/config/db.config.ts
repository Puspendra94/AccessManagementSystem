import logger from './logger';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Record<string, PostgresConnectionOptions> = {
    development: {
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],  // for production 'dist/modules/**/*.entity{.ts,.js}', 
      extra: {
        max: 5,
        min: 2,
        cli: {
          migrationsDir: __dirname + '/../migrations', // for production 'dist/migrations/*{.ts,.js}',
        },
      }, // connection pool
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      synchronize: true,
      logging: false, // for production 'false',
      type: 'postgres',
      username: process.env.DB_USER,
      migrations: [__dirname + '/../migrations/*{.ts,.js}'], // for production 'dist/migrations/*{.ts,.js}', 
      schema: process.env.DB_SCHEMA,
      migrationsRun: true,
    },
};


const getRDBMSConfig = (env: string | undefined): PostgresConnectionOptions => {
    if (!env) {
      // Setting default database to development
      env = 'development';
      logger.info(`klub-bpmn-svc:Getting dbms config for ${env} environment`);

      return config.development;
    } else {
      const configuration: PostgresConnectionOptions = config[env];
      logger.info(
        `klub-bpmn-svc:Connecting to database:${configuration.database} ********* schema:${configuration.schema}`,
      );

      return configuration;
    }
};

const rdbmsConfig: PostgresConnectionOptions = getRDBMSConfig(process.env.NODE_ENV);
// eslint-disable-next-line
export default rdbmsConfig;