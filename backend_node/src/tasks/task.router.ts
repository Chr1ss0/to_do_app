import { Router, Response, Request } from 'express';
import { TaskController } from './task.controller';

export const taskRouter: Router = Router();

// Create a default route.
taskRouter.get('/task', (req: Request, res: Response) => {
  const taskController = new TaskController();
  taskController.getAll();
});
