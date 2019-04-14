import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection({
  database: 'new_blog_test',
  entities: [],
  host: 'localhost',
  logging: false,
  password: 'admin',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: 'root'
})
  .then(connection => {
    console.log('Database connected.');
  })
  .catch(error => {
    console.log(error);
  });
