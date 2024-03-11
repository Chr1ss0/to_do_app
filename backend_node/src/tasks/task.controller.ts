import { AppDataSource } from '../..';
import { Task } from './tasks.entity';

export class TaskController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  public async getAll(): Promise<Task> {
    let allTasks: Task[];
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      console.log(allTasks);
    } catch (errors) {
      console.log(errors);
    }
  }
}
