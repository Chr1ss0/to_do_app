import express, { Express } from 'express';

import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/task.router';
import morgan from 'morgan';

// Instantiate express app
const app: Express = express();

// Parse request Body
app.use(bodyParser.json());

// Use CORS install types as well
app.use(cors());
app.use(morgan('dev'));

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define sever port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Start listenting to the requests on the defined port
    app.listen(port);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });

app.use('/', taskRouter);
