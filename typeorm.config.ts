import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'nestjs_db',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  seeds: [path.join(__dirname, 'database', '*.seeder.{ts,js}')],
} as DataSourceOptions & SeederOptions);

export default AppDataSource;
// npm run migration:generate -- src/migrations/add_product_table