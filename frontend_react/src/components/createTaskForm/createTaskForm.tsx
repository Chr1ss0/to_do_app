import { Box, Stack, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { TaskDateField } from './_taskDateField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskTitleField } from './_taskTitleField';
import { TaskSelectField } from './_taskSelectField';

export const CreateTaskForm: FC = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField />
        <TaskDescriptionField />
        <TaskDateField />

        <Stack
          sx={{ width: '100%' }}
          direction={'row'}
          spacing={2}
        >
          <TaskSelectField />
          <TaskSelectField />
        </Stack>
      </Stack>

      {/*Task Status*/}
      {/*Task Priority*/}
    </Box>
  );
};
