import React, { FC, ReactElement } from 'react';

import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ISelectField } from './interfaces/ISelectField';

export const TaskSelectField: FC<ISelectField> = (
  props,
): ReactElement => {
  const {
    value = '',
    label = 'Select Box',
    name = 'selectBox',
    items = [{ value: '', label: 'Add Items' }],
    disabled = false,
    onChange = (e: SelectChangeEvent) => console.log(e),
  } = props;
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="status">{label}</InputLabel>
      <Select
        labelId="status"
        id="status-select"
        value=""
        label="Status"
        name="status"
        onChange={(e) => console.log(e)}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};
