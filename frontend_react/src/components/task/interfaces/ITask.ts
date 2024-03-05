import { ITaskHeader } from './ITaskHeader';
import { ITaskDescription } from './ITaskDescription';
import { ITaskFooter } from './ITaskFooter';
import { Priority } from '../../createTaskForm/enums/Priority';

export interface ITask
  extends ITaskHeader,
    ITaskDescription,
    ITaskFooter {
  id?: string;
  priority?: Priority;
  status?: string;
}
