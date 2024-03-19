import { ITaskHeader } from './ITaskHeader';
import { ITaskDescription } from './ITaskDescription';
import { ITaskFooter } from './ITaskFooter';
import { Priority } from '../../createTaskForm/enums/Priority';
import { Status } from '../../createTaskForm/enums/Status';

export interface ITask
  extends ITaskHeader,
    ITaskDescription,
    ITaskFooter {
  priority?: `${Priority}`;
  status?: `${Status}`;
}
