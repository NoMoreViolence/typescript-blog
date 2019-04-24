import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection({
  database: 'new_blog_test',
  entities: [__dirname + '/models/*.model.ts'],
  host: 'localhost',
  logging: true,
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : ''
})
  .then(connection => {
    console.log('Database connected.');
  })
  .catch(error => {
    console.log(error);
  });
