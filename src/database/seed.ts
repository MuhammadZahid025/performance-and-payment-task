import AppDataSource from '../../typeorm.config';
import { runSeeders } from 'typeorm-extension';
import { ProductOrderSeeder } from './product-orders.seeder';

AppDataSource.initialize()
    .then(() => runSeeders(AppDataSource, { seeds: [ProductOrderSeeder] }))
    .then(() => {
        console.log('Database seeding completed!');
        return AppDataSource.destroy();
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });