import { Task } from './tasks.entity';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request, Response } from 'express';
import { AppDataSource } from '../..';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TaskController {
  public async getAll(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    const newTask = new Task();
    const { title, date, description, priority, status } =
      req.body;
    newTask.title = title;
    newTask.date = date;
    newTask.description = description;
    newTask.priority = priority;
    newTask.status = status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (_errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({ where: { id: req.body.id } });
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }

    if (!task) {
      return res.status(404).json({
        error: 'The task with given ID does not exist',
      });
    }

    let updateTask: UpdateResult;

    try {
      updateTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      updateTask = instanceToPlain(
        updateTask,
      ) as UpdateResult;

      return res.status(201).json({ updateTask });
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TaskController();
