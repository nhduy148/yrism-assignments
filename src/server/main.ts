import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import os from 'os';
import formData from './middlewares/form-data';

import path from 'path';
import { EmployeeController } from './controllers/employee.controller';
import { PositionResourceController } from './controllers/position-resource.controller';
import { seedDatabase } from './database';

dotenv.config({ path: '.env.' + process.env.NODE_ENV });
dotenv.config({ path: '.env' });

const app = express();

app.use(
  formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true,
  }),
);

app.use(formData.format());

app.use(formData.stream());

app.use(formData.union());

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use(express.static('dist/app'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

seedDatabase();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to mock-server!' });
});

app.get('/api/seed', async (req, res) => {
  await seedDatabase();
  res.send({ success: true });
});

app.use('/api/employees', EmployeeController.router);
app.use('/api/positionResources', PositionResourceController.router);

const port = process.env.SERVER_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
