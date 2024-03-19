import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
} from 'react';

import {
  Box,
  Grid,
  Alert,
  LinearProgress,
} from '@mui/material';
import format from 'date-fns/format';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const { error, isLoading, data, refetch } = useQuery(
    'tasks',
    async () => {
      return await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/task',
        'GET',
      );
    },
  );

  const updateTaskMutation = useMutation(
    (data: IUpdateTask) =>
      sendApiRequest(
        'http://localhost:3200/task',
        'PUT',
        data,
      ),
  );

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked
        ? Status.inProgress
        : Status.todo,
    });
  }
  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>
          {`Status of Your Tasks As On ${format(
            new Date(),
            'PPPP',
          )}`}
        </h2>
      </Box>
      <Grid
        container
        display={'flex'}
        justifyContent={'center'}
      >
        <Grid
          item
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          md={10}
          mx={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={
              data
                ? countTasks(data, Status.todo)
                : undefined
            }
          />
          <TaskCounter
            status={Status.inProgress}
            count={
              data
                ? countTasks(data, Status.inProgress)
                : undefined
            }
          />
          <TaskCounter
            status={Status.completed}
            count={
              data
                ? countTasks(data, Status.completed)
                : undefined
            }
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={8}
        >
          <>
            {error && (
              <Alert severity="error">
                There was an error fetching your tasks
              </Alert>
            )}

            {!error &&
              Array.isArray(data) &&
              data.length === 0 && (
                <Alert severity="warning">
                  You have no todos yet
                </Alert>
              )}

            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((each) => {
                return each.status === Status.todo ||
                  each.status === Status.inProgress ? (
                  <Task
                    key={each.id + each.titel}
                    id={each.id}
                    date={new Date(each.date)}
                    description={each.description}
                    priority={each.priority}
                    status={each.status}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
