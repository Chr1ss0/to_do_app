import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TaskDateField } from './_taskDateField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskTitleField } from './_taskTitleField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<
    string | undefined
  >(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Status>(Status.todo);
  const [priority, setPriority] = useState<Priority>(
    Priority.normal,
  );

  const [showSuccess, setShowSucess] = useState<boolean>();

  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const createTaskMutation = useMutation(
    (data: ICreateTask) =>
      sendApiRequest(
        'http://localhost:3200/task',
        'POST',
        data,
      ),
  );

  function createtaskHandler() {
    if (!title || !date || !description) {
      return;
    }
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSucess(true);
      tasksUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSucess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert
          severity="success"
          sx={{ width: '100%', margin: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been created sucessfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TaskDescriptionField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField
          disabled={createTaskMutation.isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />

        <Stack
          sx={{ width: '100%' }}
          direction={'row'}
          spacing={2}
        >
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Status"
            name="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as Status)
            }
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as Priority)
            }
            items={[
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
          onClick={createtaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};
