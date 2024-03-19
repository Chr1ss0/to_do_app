import { Router } from 'express';
import {
  createValidator,
  updateValidator,
} from './task.validator';
import { taskController } from './task.controller';

export const taskRouter: Router = Router();

taskRouter.get('/task', taskController.getAll);

taskRouter.post(
  '/task',
  createValidator,
  taskController.create,
);

taskRouter.put(
  '/task',
  updateValidator,
  taskController.update,
);
